import { ref, computed, nextTick, watch } from "vue";
import {
  commandRegistry,
  getCommand,
  welcomeMessage,
} from "../utils/terminalCommands";

export function useTerminal(containerRef, inputRef) {
  // State
  const terminalLines = ref([]);
  const commandHistory = ref([]);
  const historyIndex = ref(-1);
  const currentInput = ref("");
  const activeHelp = ref(null);
  const uptime = ref("00d 00h 00m 00s");
  const systemStartTime = ref(new Date(2020, 8, 28, 12, 0, 0).getTime());

  // Max lines to keep in memory for performance
  const MAX_LINES = 100;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const isAutoScrollEnabled = ref(true);

  const scrollToBottom = async () => {
    await nextTick();
    if (containerRef.value && isAutoScrollEnabled.value) {
      containerRef.value.scrollTop = containerRef.value.scrollHeight;
    }
  };

  // Watch for changes and scroll
  watch(terminalLines, scrollToBottom, { deep: true });

  /**
   * Internal helper to add lines with optional typing effect and capping
   */
  const pushLine = (line) => {
    terminalLines.value.push(line);

    // Cap lines
    if (terminalLines.value.length > MAX_LINES) {
      terminalLines.value = terminalLines.value.slice(-MAX_LINES);
    }
  };

  const addLineWithTyping = async (line) => {
    if (line.type === "text") {
      const fullContent = line.content;
      const typingLine = ref({ ...line, content: "" });
      pushLine(typingLine.value);

      for (let i = 0; i < fullContent.length; i++) {
        typingLine.value.content += fullContent[i];
        await sleep(20);
      }
    } else {
      pushLine(line);
    }
  };

  const runCommand = async (fullInput) => {
    const input = fullInput.trim();
    if (input === "") return;

    const [cmdName, ...args] = input.split(/\s+/);
    const cmdNameLower = cmdName.toLowerCase();

    const cmd = getCommand(cmdNameLower);
    const isOuvrir = cmdNameLower === "ouvrir";
    
    // Manage auto-scroll and terminal clear
    if (isOuvrir) {
      terminalLines.value = [];
      isAutoScrollEnabled.value = false;
      await nextTick();
      if (containerRef.value) {
        containerRef.value.scrollTop = 0;
      }
    } else {
      isAutoScrollEnabled.value = true;
    }

    // Log command in terminal
    pushLine({ type: "prompt", content: input });

    // Add to history
    if (commandHistory.value[commandHistory.value.length - 1] !== input) {
      commandHistory.value.push(input);
    }
    historyIndex.value = -1;

    if (cmd) {
      // Clear previous specific help if not aide
      if (cmdNameLower !== "aide") {
        activeHelp.value = null;
      }

      // Execute command
      const context = { terminalLines, activeHelp };
      const result = cmd.handler(args, context, commandRegistry);

      if (cmdNameLower === "aide") {
        activeHelp.value = result;
      } else if (result && result.length > 0) {
        for (const line of result) {
          pushLine(line);
          await sleep(50);
        }
      }
    } else {
      pushLine({
        type: "error",
        content: `ERR: Commande '${cmdNameLower}' non reconnue. Essayez 'aide'.`,
      });
    }
  };

  const navigateHistory = (direction) => {
    if (commandHistory.value.length === 0) return;

    if (direction === "up") {
      if (historyIndex.value < commandHistory.value.length - 1) {
        historyIndex.value++;
      }
    } else if (direction === "down") {
      if (historyIndex.value > -1) {
        historyIndex.value--;
      }
    }

    if (historyIndex.value === -1) {
      currentInput.value = "";
    } else {
      currentInput.value =
        commandHistory.value[
          commandHistory.value.length - 1 - historyIndex.value
        ];
    }
  };

  const updateUptime = () => {
    const now = new Date().getTime();
    const diff = now - systemStartTime.value;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    uptime.value = `${days}j ${hours.toString().padStart(2, "0")}h ${minutes
      .toString()
      .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
  };

  const startWelcomeSequence = async () => {
    for (const line of welcomeMessage) {
      await addLineWithTyping(line);
      await sleep(100);
    }
    inputRef.value?.focus();
  };

  return {
    terminalLines,
    commandHistory,
    currentInput,
    activeHelp,
    uptime,
    runCommand,
    navigateHistory,
    updateUptime,
    startWelcomeSequence,
  };
}
