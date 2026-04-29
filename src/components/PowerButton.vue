<script setup>
defineEmits(["power-on"]);
</script>

<template>
  <div
    class="absolute inset-0 z-50 flex flex-col items-center justify-center space-y-8 bg-bg"
  >
    <button
      @click="$emit('power-on')"
      class="group relative flex items-center justify-center w-24 h-24 rounded-full border-2 border-dim hover:border-accent transition-all duration-300 active:scale-95 cursor-pointer"
    >
      <span class="text-dim group-hover:text-accent text-4xl transition-colors!"
        >⏻</span
      >
      <div
        class="absolute inset-0 rounded-full group-hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-shadow"
      ></div>
    </button>
    <div
      class="text-dim term-secondary tracking-[0.2em] uppercase animate-pulse text-center"
    >
      Pour une meilleure expérience, passez en mode plein écran
    </div>
    <div class="flex space-x-8 dim-text term-label tracking-widest font-mono">
      <div class="flex flex-col items-center space-y-2">
        <span class="opacity-50">WINDOWS</span>
        <span class="px-2 py-1 border border-dim/30 rounded-sm">F11</span>
      </div>
      <div class="flex flex-col items-center space-y-2">
        <span class="opacity-50">MAC</span>
        <span class="px-2 py-1 border border-dim/30 rounded-sm">⌘ + ⌃ + F</span>
      </div>
    </div>
  </div>
</template>
