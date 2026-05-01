<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";
import BootScreen from "./components/BootScreen.vue";
import SystemBanner from "./components/SystemBanner.vue";
import TerminalLine from "./components/TerminalLine.vue";
import TerminalInput from "./components/TerminalInput.vue";
import SidePanel from "./components/SidePanel.vue";
import PowerButton from "./components/PowerButton.vue";
import MobileError from "./components/MobileError.vue";

import { useTerminal } from "./composables/useTerminal";
import pcStartupSound from "./assets/old-pc-startup.mp3";

// System State
const isOff = ref(true);
const isBooting = ref(true);
const hasPoweredOn = ref(false);
const isMobile = ref(false);

// Refs
const inputRef = ref(null);
const containerRef = ref(null);

// Terminal Logic
const {
  terminalLines,
  commandHistory,
  currentInput,
  activeHelp,
  uptime,
  runCommand,
  navigateHistory,
  updateUptime,
  startWelcomeSequence,
} = useTerminal(containerRef, inputRef);

// Lifecycle
let uptimeInterval;

const checkMobile = () => {
  isMobile.value =
    window.innerWidth <= 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
};

const focusInput = () => {
  if (inputRef.value?.focus) {
    inputRef.value.focus();
  }
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

  // Audio Playback
  const audio = new Audio(pcStartupSound);
  audio.volume = 1;
  audio.play().catch((e) => console.log("Audio play blocked:", e));
};

const handleCommand = async () => {
  const current = currentInput.value;
  currentInput.value = "";
  await runCommand(current);
};

const onBootComplete = () => {
  isBooting.value = false;
  startWelcomeSequence();
};
</script>

<template>
  <MobileError v-if="isMobile" />

  <div
    v-else
    class="terminal-container selection:bg-accent selection:text-bg crt-distortion"
    :class="{
      'crt-flicker crt-jitter crt-grille crt-scanlines': !isOff,
    }"
    @click="focusInput"
  >
    <!-- CRT Noise Layer (Activated on Power On) -->
    <div v-if="!isOff" class="crt-noise-overlay"></div>

    <!-- Power Button (Visible only when system is OFF) -->
    <PowerButton v-if="isOff" @power-on="handlePowerOn" />

    <!-- Screen Content Wrapper (The Layer that receives CRT filters) -->
    <div
      v-if="!isOff"
      class="h-full w-full flex flex-col crt-screen-content"
      :class="hasPoweredOn ? 'power-on-anim' : 'opacity-0'"
    >
      <!-- Top Banner -->
      <SystemBanner v-if="!isBooting" :uptime="uptime" />

      <!-- Content Area -->
      <div class="flex-grow flex overflow-hidden">
        <!-- Main Terminal Section -->
        <div class="flew-grow flex flex-col overflow-hidden relative w-full">
          <BootScreen v-if="isBooting" @complete="onBootComplete" />

          <template v-else>
            <div
              ref="containerRef"
              class="terminal-content pl-6 pr-4 pt-4 scroll-smooth"
            >
              <div class="w-full">
                <TerminalLine
                  v-for="(line, index) in terminalLines"
                  :key="index"
                  :line="line"
                  v-memo="[line.content, line.type, line.name, line.src]"
                  @run-command="runCommand"
                />
              </div>
            </div>
            <!-- Persistent Footer -->
            <TerminalInput
              ref="inputRef"
              v-model="currentInput"
              :active-help="activeHelp"
              :history="commandHistory"
              @submit="handleCommand"
              @navigate-history="navigateHistory"
            />
          </template>
        </div>

        <!-- Right Side Widgets -->
        <SidePanel v-if="!isBooting" class="w-2/6!" />
      </div>
    </div>
  </div>
</template>

<style>
.terminal-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 3rem;
}

/* Hide scrollbar but keep functionality */
.terminal-content::-webkit-scrollbar {
  width: 4px;
}
.terminal-content::-webkit-scrollbar-track {
  background: transparent;
}
.terminal-content::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 10px;
}
</style>
