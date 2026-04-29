<script setup>
// No props needed for now
</script>

<template>
  <div
    class="flex flex-col items-center justify-center h-screen text-center p-6 space-y-6"
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
</template>
