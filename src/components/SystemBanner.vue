<script setup>
defineProps({
  uptime: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="sticky top-0 z-40 pb-5 pt-2">
    <div
      class="container-max flex justify-between items-start font-mono term-label tracking-widest"
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
    <div class="container-max px-4 mt-6">
      <div
        class="h-px w-full bg-linear-to-r from-transparent via-border to-transparent"
      ></div>
    </div>
  </div>
</template>
