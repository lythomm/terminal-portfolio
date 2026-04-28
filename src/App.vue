<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import BootScreen from "./components/BootScreen.vue";
import pcStartupSound from "./assets/old-pc-startup.mp3";

const terminalLines = ref([]);
const isOff = ref(true);
const isBooting = ref(true);
const hasPoweredOn = ref(false);
const isMobile = ref(false);
const currentInput = ref("");
const inputRef = ref(null);
const containerRef = ref(null);
const commandHistory = ref([]);
const historyIndex = ref(-1);
const uptime = ref("00d 00h 00m 00s");
const systemStartTime = ref(new Date(2026, 3, 28, 12, 0, 0).getTime());

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

  uptime.value = `${days}d ${hours.toString().padStart(2, "0")}h ${minutes
    .toString()
    .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
};

let uptimeInterval;

const checkMobile = () => {
  isMobile.value =
    window.innerWidth <= 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
  updateUptime();
  uptimeInterval = setInterval(updateUptime, 1000);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
  clearInterval(uptimeInterval);
});

const handlePowerOn = () => {
  isOff.value = false;
  hasPoweredOn.value = true;
  const audio = new Audio(pcStartupSound);
  audio.volume = 0.6;
  audio.play().catch((e) => console.log("Audio play blocked:", e));
};

const commands = {
  "a-propos": () => {
    return [
      { type: "header", content: "// à propos" },
      {
        type: "text",
        content:
          "Je suis un jeune développeur web passionné par les interfaces minimalistes et les expériences utilisateur immersives.",
      },
      {
        type: "text",
        content:
          "Spécialisé en Vue.js et Tailwind CSS, j'aime construire des outils qui semblent vivants.",
      },
      {
        type: "text",
        content: "Basé en France, disponible pour de nouveaux projets.",
      },
    ];
  },
  projets: () => {
    return [
      { type: "header", content: "// projets sélectionnés" },
      {
        type: "project",
        name: "ZUI_OS",
        year: "2026",
        stack: "Vue 3 / Tailwind",
        status: "EN LIGNE",
      },
      {
        type: "project",
        name: "Neural-Sync",
        year: "2025",
        stack: "React / Three.js",
        status: "PUBLIÉ",
      },
      {
        type: "project",
        name: "Vibe-Check",
        year: "2024",
        stack: "Next.js / Supabase",
        status: "EN COURS",
      },
      {
        type: "text",
        content: "",
      },
      {
        type: "text",
        content: 'Utilisez "ouvrir <nom>" pour explorer un projet spécifique.',
      },
    ];
  },
  ouvrir: (args) => {
    if (!args || args.length === 0) {
      return [{ type: "error", content: "USAGE: ouvrir <nom_du_projet>" }];
    }

    const projectName = args[0].toLowerCase();
    const projectDetails = {
      zui_os: {
        description:
          "Un système d'exploitation fictif pour portfolio, explorant les interfaces rétro-futuristes et la navigation textuelle.",
        url: "https://zui.ooo",
        tech: ["Vue 3", "Vite", "Tailwind CSS v4"],
      },
      "neural-sync": {
        description:
          "Plateforme de visualisation de données neuronales en temps réel utilisant Three.js pour le rendu 3D.",
        url: "#",
        tech: ["React", "Three.js", "Web Workers"],
      },
      "vibe-check": {
        description:
          "Outil d'analyse de sentiment social pour les communautés en ligne. Actuellement en phase de test alpha.",
        url: "#",
        tech: ["Next.js", "Supabase", "OpenAI API"],
      },
    };

    if (projectName in projectDetails) {
      const p = projectDetails[projectName];
      const result = [
        { type: "header", content: `// projet: ${projectName.toUpperCase()}` },
        { type: "text", content: p.description },
        { type: "text", content: `STACK: ${p.tech.join(", ")}` },
      ];

      if (p.url !== "#") {
        window.open(p.url, "_blank");
        result.push({
          type: "accent",
          content: `URL: ${p.url} (Ouvert dans un nouvel onglet)`,
        });
      }

      return result;
    } else {
      return [
        { type: "error", content: `ERR: Projet '${projectName}' introuvable.` },
      ];
    }
  },
  parcours: () => {
    return [
      { type: "header", content: "// parcours" },
      {
        type: "experience",
        role: "Développeur Freelance",
        company: "Indépendant",
        period: "2025 - Présent",
      },
      {
        type: "experience",
        role: "Développeur Web Junior",
        company: "Creative Lab",
        period: "2024 - 2025",
      },
      {
        type: "experience",
        role: "Stagiaire Développeur Web",
        company: "Tech Startup",
        period: "2023 - 2024",
      },
    ];
  },
  contact: () => {
    return [
      { type: "header", content: "// me contacter" },
      { type: "text", content: "Email: contact@thomas.dev" },
      { type: "text", content: "GitHub: @thomas_dev" },
      { type: "text", content: "Twitter: @thomas_dev" },
    ];
  },

  historique: () => {
    return commandHistory.value.map((cmd, i) => ({
      type: "text",
      content: `${i + 1}  ${cmd}`,
    }));
  },

  aide: () => {
    return [
      { type: "header", content: "// commandes disponibles" },
      { type: "text", content: "a-propos     - En savoir plus sur moi" },
      { type: "text", content: "projets      - Liste de mes réalisations" },
      { type: "text", content: "ouvrir <nom> - Détails sur un projet" },
      { type: "text", content: "parcours     - Mon parcours professionnel" },
      { type: "text", content: "contact      - Mes réseaux et email" },
      { type: "text", content: "historique   - Historique des commandes" },
      { type: "text", content: "effacer      - Effacer le terminal" },
      { type: "text", content: "aide         - Afficher cette aide" },
    ];
  },
  effacer: () => {
    terminalLines.value = [];
    return [];
  },
};

const welcomeMessage = [
  {
    type: "ascii",
    content: `
  ████████╗██╗  ██╗ ██████╗ ███╗   ███╗ █████╗ ███████╗
  ╚══██╔══╝██║  ██║██╔═══██╗████╗ ████║██╔══██╗██╔════╝
     ██║   ███████║██║   ██║██╔████╔██║███████║███████╗
     ██║   ██╔══██║██║   ██║██║╚██╔╝██║██╔══██║╚════██║
     ██║   ██║  ██║╚██████╔╝██║ ╚═╝ ██║██║  ██║███████║
     ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝
  `,
  },
  { type: "text", content: "THOMAS_OS v1.0.0 - INITIALISATION..." },
  {
    type: "text",
    content: 'Tapez "aide" pour afficher la liste des commandes.',
  },
  { type: "text", content: "" },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const addLineWithTyping = async (line) => {
  if (line.type === "text") {
    const fullContent = line.content;
    const typingLine = ref({ ...line, content: "" });
    terminalLines.value.push(typingLine.value);

    for (let i = 0; i < fullContent.length; i++) {
      typingLine.value.content += fullContent[i];
      await sleep(20);
    }
  } else {
    terminalLines.value.push(line);
  }
};

const handleCommand = () => {
  const fullInput = currentInput.value.trim();
  if (fullInput === "") return;

  const [cmd, ...args] = fullInput.toLowerCase().split(/\s+/);

  terminalLines.value.push({ type: "prompt", content: currentInput.value });
  commandHistory.value.push(fullInput);

  if (cmd in commands) {
    const result = commands[cmd](args);
    if (result && result.length > 0) {
      terminalLines.value.push(...result);
    }
  } else {
    terminalLines.value.push({
      type: "error",
      content: `ERR: Commande '${cmd}' non reconnue. Essayez 'aide'.`,
    });
  }

  currentInput.value = "";
};

const focusInput = () => {
  inputRef.value?.focus();
};

const scrollToBottom = async () => {
  await nextTick();
  if (containerRef.value) {
    containerRef.value.scrollTop = containerRef.value.scrollHeight;
  }
};

const onBootComplete = async () => {
  isBooting.value = false;

  // Welcome Message
  for (const line of welcomeMessage) {
    await addLineWithTyping(line);
    await sleep(100);
  }
  focusInput();
};

watch(terminalLines, scrollToBottom, { deep: true });
</script>

<template>
  <div
    v-if="isMobile"
    class="flex flex-col items-center justify-center h-100dvh text-center p-6 space-y-6"
  >
    <div class="text-err text-5xl animate-pulse">ERREUR MATÉRIELLE</div>
    <div class="border border-err/30 p-8 bg-err/5 max-w-md">
      <p class="text-xl mb-4">INCOMPATIBILITÉ DÉTECTÉE</p>
      <p class="dim-text leading-relaxed">
        Le système <span class="accent-text">THOMAS_OS</span> nécessite un
        clavier physique et une résolution d'affichage supérieure pour
        fonctionner correctement.
      </p>
      <div class="h-px bg-err/20 my-6"></div>
      <p class="text-sm">
        Pour une expérience optimale, veuillez redémarrer ce terminal sur un
        <span class="text-fg underline underline-offset-4">ordinateur</span>.
      </p>
    </div>
    <div class="dim-text text-xs tracking-widest uppercase">
      Code d'erreur: MOBILE_DEVICE_INCOMPATIBLE_ERR
    </div>
  </div>

  <div
    v-else
    class="terminal-container selection:bg-accent selection:text-bg"
    @click="focusInput"
  >
    <!-- Power Button (Visible only when system is OFF) -->
    <div
      v-if="isOff"
      class="absolute inset-0 z-50 flex flex-col items-center justify-center space-y-8 bg-bg"
    >
      <button
        @click="handlePowerOn"
        class="group relative flex items-center justify-center w-24 h-24 rounded-full border-2 border-dim hover:border-accent transition-all duration-300 active:scale-95 cursor-pointer"
      >
        <span
          class="text-dim group-hover:text-accent text-4xl transition-colors!"
          >⏻</span
        >
        <div
          class="absolute inset-0 rounded-full group-hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-shadow"
        ></div>
      </button>
      <div class="text-dim text-xs tracking-[0.2em] uppercase animate-pulse">
        Démarrer
      </div>
    </div>

    <!-- Screen Content (Boot Sequence & Terminal) -->
    <div
      v-if="!isOff"
      class="h-full w-full flex flex-col"
      :class="[hasPoweredOn ? 'power-on-anim' : 'opacity-0']"
    >
      <!-- Top Banner -->
      <div v-if="!isBooting" class="sticky top-0 z-40 pb-5 pt-2">
        <div
          class="max-w-[1100px] mx-auto w-full flex justify-between items-start font-mono text-[12px] tracking-widest"
        >
          <div class="space-y-1.5">
            <div class="flex items-center space-x-3">
              <span class="dim-text uppercase">OS.Noyau</span>
              <span class="text-fg font-bold">THOMAS_OS v1.0.0</span>
            </div>
            <div class="flex items-center space-x-3">
              <span class="dim-text uppercase">OS.Auth</span>
              <span class="accent-text bg-accent/5 px-1.5 py-0.5 rounded-sm"
                >ACCÈS_INVITÉ</span
              >
            </div>
            <div class="flex items-center space-x-3">
              <span class="dim-text uppercase">OS.Nœud</span>
              <span class="text-fg">portfolio-node-01</span>
            </div>
          </div>
          <div class="space-y-1.5 text-right">
            <div class="flex justify-end items-center space-x-3">
              <span class="dim-text uppercase">Activité</span>
              <span class="text-fg tabular-nums">{{ uptime }}</span>
            </div>
            <div class="flex justify-end items-center space-x-3">
              <span class="dim-text uppercase">Session</span>
              <span class="text-fg">TTY-01</span>
            </div>
            <div class="flex justify-end items-center space-x-3">
              <span class="dim-text uppercase">Statut</span>
              <div class="flex items-center space-x-2">
                <span class="relative flex h-2 w-2">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
                  ></span>
                  <span
                    class="relative inline-flex rounded-full h-2 w-2 bg-accent"
                  ></span>
                </span>
                <span class="text-accent font-bold">EN LIGNE</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Separator -->
        <div class="max-w-[1100px] mx-auto w-full px-4 mt-6">
          <div
            class="h-px w-full bg-linear-to-r from-transparent via-border to-transparent"
          ></div>
        </div>
      </div>

      <div
        class="terminal-content flex-grow overflow-y-auto"
        ref="containerRef"
      >
        <div class="max-w-[1100px] mx-auto w-full">
          <!-- Boot Sequence -->
          <BootScreen v-if="isBooting" @complete="onBootComplete" />

          <!-- Terminal Output -->
          <div
            v-else
            v-for="(line, index) in terminalLines"
            :key="index"
            class="mb-1"
          >
            <!-- Prompt Line -->
            <div v-if="line.type === 'prompt'" class="flex">
              <span class="accent-text mr-2">thomas-portfolio:~$</span>
              <span>{{ line.content }}</span>
            </div>

            <!-- ASCII Art -->
            <pre
              v-else-if="line.type === 'ascii'"
              class="accent-text text-[5px] md:text-[10.5px] leading-[1.12] overflow-x-auto"
              >{{ line.content }}</pre
            >

            <!-- Header -->
            <div
              v-else-if="line.type === 'header'"
              class="mt-4 mb-2 pb-1 border-b border-border dim-text text-[11px] uppercase tracking-[0.12em]"
            >
              {{ line.content }}
            </div>

            <!-- Project Grid -->
            <div
              v-else-if="line.type === 'project'"
              class="grid grid-cols-[1fr_80px_150px_80px] gap-2 py-1 items-center hover:bg-surface px-1"
            >
              <span class="accent-text">{{ line.name }}</span>
              <span class="dim-text text-[13px]">{{ line.year }}</span>
              <span class="dim-text text-[13px]">{{ line.stack }}</span>
              <span
                :class="[
                  'text-[10px] px-2 py-0.5 border text-center',
                  ['EN LIGNE', 'PUBLIÉ'].includes(line.status)
                    ? 'text-accent border-accent-border'
                    : 'text-orange border-orange/40',
                ]"
              >
                {{ line.status }}
              </span>
            </div>

            <!-- Experience Row -->
            <div
              v-else-if="line.type === 'experience'"
              class="flex justify-between items-center py-1"
            >
              <div>
                <span class="text-fg">{{ line.role }}</span>
                <span class="dim-text mx-2">@</span>
                <span class="accent-text">{{ line.company }}</span>
              </div>
              <span class="dim-text text-[13px]">{{ line.period }}</span>
            </div>

            <!-- Error Text -->
            <div v-else-if="line.type === 'error'" class="text-err">
              {{ line.content }}
            </div>

            <!-- Simple Text -->
            <div v-else class="text-fg">
              {{ line.content }}
            </div>
          </div>

          <!-- Current Input Prompt -->
          <div v-if="!isBooting" class="flex items-center mt-2">
            <span class="accent-text mr-2">thomas-portfolio:~$</span>
            <input
              ref="inputRef"
              v-model="currentInput"
              type="text"
              class="bg-transparent border-none outline-none flex-grow text-fg caret-accent p-0 font-mono placeholder:text-dim"
              placeholder="écrivez une commande (essayer: aide)"
              @keydown.enter="handleCommand"
              @keydown.up.prevent="navigateHistory('up')"
              @keydown.down.prevent="navigateHistory('down')"
              spellcheck="false"
              autocomplete="off"
              autofocus
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
