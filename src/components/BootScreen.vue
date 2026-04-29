<script setup>
import { ref, onMounted } from "vue";

const emit = defineEmits(["complete"]);

const bootLines = ref([]);
const bootSequence = [
  "THOMAS_OS(R) BIOS v1.0.0 (C) 2000-2026",
  "CPU : VIRTUAL CORE 01 @ 3.40GHz",
  "Vérification de la mémoire : 65536KB OK",
  "",
  "Détection des périphériques IDE...",
  "  Primary Master   : VIRTUAL-DISK-01 (40GB)",
  "  Secondary Master : NONE",
  "",
  "Chargement du noyau thomas_os.sys...",
  "Montage des systèmes de fichiers...",
  "Initialisation du réseau... OK (127.0.0.1)",
  "Chargement de l'interface utilisateur...",
  "",
  "SYSTÈME PRÊT.",
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

onMounted(async () => {
  await sleep(800); // Wait for the new 0.8s power-on animation
  for (const line of bootSequence) {
    bootLines.value.push(line);
    if (line === "") {
      await sleep(100);
    } else if (line.startsWith("Détection") || line.startsWith("Chargement")) {
      await sleep(500);
    } else {
      await sleep(100);
    }
  }

  await sleep(1200);
  emit("complete");
});
</script>

<template>
  <div class="relative h-full w-full overflow-hidden">
    <!-- CRT Power-On Flash -->
    <div class="absolute inset-0 z-50 pointer-events-none flash-overlay"></div>

    <div class="relative z-10 p-4">
      <div
        v-for="(line, index) in bootLines"
        :key="'boot-' + index"
        class="mb-1 dim-text term-main"
      >
        {{ line }}
      </div>
      <span class="animate-pulse">_</span>
    </div>
  </div>
</template>

<style scoped>
.flash-overlay {
  background: white;
  animation: crtFlash 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
}

@keyframes crtFlash {
  0% {
    opacity: 0;
    transform: scaleY(0.002) scaleX(0);
  }
  5% {
    opacity: 1;
    transform: scaleY(0.002) scaleX(1);
  }
  15% {
    opacity: 1;
    transform: scaleY(1) scaleX(1);
  }
  100% {
    opacity: 0;
  }
}
</style>
