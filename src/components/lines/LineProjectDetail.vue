<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="my-10 border border-accent/30 bg-accent/5 p-8 relative overflow-hidden animate-draw-border">
    <!-- Coins décoratifs (Retro-Tech corners) -->
    <div class="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-accent/40 animate-fade-in" style="animation-delay: 800ms;"></div>
    <div class="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-accent/40 animate-fade-in" style="animation-delay: 800ms;"></div>
    
    <!-- En-tête du projet -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-accent/20 pb-6 animate-fade-in" style="animation-delay: 400ms;">
      <div>
        <div class="text-[10px] uppercase tracking-[0.4em] text-accent/60 mb-1 font-mono animate-reveal-text" style="animation-delay: 600ms;">Project_Registry_Entry</div>
        <h3 class="text-4xl font-black text-fg tracking-tighter uppercase italic animate-reveal-text" style="animation-delay: 700ms;">{{ project.name }}</h3>
      </div>
      <div class="text-right opacity-0 animate-fade-in" style="animation-delay: 900ms;">
        <div class="text-[10px] uppercase tracking-widest text-dim mb-1">System_Status</div>
        <span class="px-4 py-1.5 bg-accent text-bg font-black text-xs tracking-widest uppercase rounded-sm shadow-[0_0_15px_rgba(74,222,128,0.3)]">
          {{ project.status }}
        </span>
      </div>
    </div>

    <!-- Description -->
    <div class="mb-10 max-w-3xl opacity-0 animate-fade-in" style="animation-delay: 1000ms;">
      <div class="text-[10px] uppercase tracking-[0.2em] text-accent/40 mb-3 block font-mono">// DESCRIPTION_EXEC_SUMMARY</div>
      <p class="text-fg/90 text-xl leading-relaxed font-medium">
        {{ project.description }}
      </p>
    </div>

    <!-- Grid d'informations techniques -->
    <div class="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 border-t border-accent/10 pt-8 opacity-0 animate-fade-in" style="animation-delay: 1200ms;">
      <div class="space-y-6">
        <div class="flex items-center space-x-3">
          <span class="w-3 h-3 bg-accent animate-pulse"></span>
          <span class="text-[11px] uppercase tracking-[0.2em] font-bold text-dim">Tech_Capabilities_Modules</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <span v-for="(t, idx) in project.tech" :key="t" 
                class="px-3 py-1 bg-bg border border-accent/20 text-accent text-xs font-mono hover:bg-accent hover:text-bg transition-all duration-300 cursor-default uppercase tracking-wider opacity-0 animate-pop-in"
                :style="{ animationDelay: 1300 + (idx * 100) + 'ms' }">
            {{ t }}
          </span>
        </div>
      </div>
      
      <div class="bg-accent/10 p-6 border-l-4 border-accent relative overflow-hidden group opacity-0 animate-fade-in" style="animation-delay: 1500ms;">
        <!-- Background decorative text -->
        <div class="absolute -right-4 -bottom-2 text-[40px] font-black text-accent/5 select-none pointer-events-none uppercase">AUTHORITY</div>
        
        <div class="text-[11px] uppercase tracking-widest font-bold text-dim mb-3 relative z-10">Role_Authority_Level</div>
        <div class="text-fg font-black tracking-tight text-xl relative z-10">{{ project.role }}</div>
      </div>
    </div>

    <!-- Lien d'action -->
    <div v-if="project.url && project.url !== '#'" class="mt-12 flex justify-end opacity-0 animate-fade-in" style="animation-delay: 1800ms;">
      <a :href="project.url" 
         target="_blank" 
         class="relative group px-8 py-3 bg-accent/10 border border-accent/40 text-accent font-black overflow-hidden transition-all hover:bg-accent hover:text-bg">
        <div class="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 bg-accent transition-transform duration-300 ease-out -z-10"></div>
        <div class="flex items-center space-x-3 tracking-[0.2em] text-xs">
          <span>EXECUTE_LIVE_VIEW</span>
          <span class="group-hover:translate-x-1 transition-transform">-></span>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
/* Effet de scanline local conservé pour l'immersion */
.animate-draw-border::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(74, 222, 128, 0.1);
  animation: local-scan 4s linear infinite;
  pointer-events: none;
}

@keyframes local-scan {
  0% { top: 0; }
  100% { top: 100%; }
}
</style>
