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
  <div class="boot-sequence">
    <div
      v-for="(line, index) in bootLines"
      :key="'boot-' + index"
      class="mb-1 dim-text"
    >
      {{ line }}
    </div>
    <span class="animate-pulse">_</span>
  </div>
</template>
