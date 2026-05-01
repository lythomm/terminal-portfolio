<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
});

defineEmits(["run-command"]);
</script>

<template>
  <div
    class="border border-accent/30 bg-accent/5 p-8 relative overflow-hidden animate-draw-border"
  >
    <!-- Coins décoratifs (Retro-Tech corners) -->
    <div
      class="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-accent/40 animate-fade-in"
      style="animation-delay: 800ms"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-accent/40 animate-fade-in"
      style="animation-delay: 800ms"
    ></div>

    <!-- En-tête du projet -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-accent/20 pb-6 animate-fade-in"
      style="animation-delay: 400ms"
    >
      <div>
        <div
          class="term-small uppercase tracking-[0.4em] text-accent/60 mb-1 font-mono animate-reveal-text"
          style="animation-delay: 600ms"
        >
          Project_Registry_Entry
        </div>
        <h3
          class="text-4xl font-black text-fg tracking-tighter uppercase animate-reveal-text"
          style="animation-delay: 700ms"
        >
          {{ project.name }}
        </h3>
      </div>
      <div
        class="text-right opacity-0 animate-fade-in"
        style="animation-delay: 900ms"
      >
        <div class="term-small uppercase tracking-widest text-dim mb-1">
          System_Status
        </div>
        <span
          class="px-4 py-1.5 bg-accent text-bg font-black text-xs tracking-widest uppercase rounded-sm shadow-[0_0_15px_rgba(74,222,128,0.3)]"
        >
          {{ project.status }}
        </span>
      </div>
    </div>

    <!-- Sections dynamiques -->
    <div
      v-for="(section, sIdx) in project.sections"
      :key="sIdx"
      class="mb-12 opacity-0 animate-fade-in"
      :style="{ animationDelay: 800 + sIdx * 200 + 'ms' }"
    >
      <div
        class="term-small uppercase tracking-[0.2em] text-accent/40 mb-3 block font-mono"
      >
        // {{ section.label }}
      </div>

      <div
        v-if="section.type === 'text'"
        class="text-fg/90 text-xl leading-relaxed font-medium"
      >
        {{ section.content }}
      </div>

      <ul v-else-if="section.type === 'list'" class="space-y-3">
        <li
          v-for="(item, iIdx) in section.content"
          :key="iIdx"
          class="flex items-start space-x-4"
        >
          <span class="text-accent mt-1.5 text-xs">>></span>
          <span class="text-fg/80 text-lg leading-relaxed">{{ item }}</span>
        </li>
      </ul>

      <div
        v-else-if="section.type === 'image'"
        class="mt-6 relative group/img overflow-hidden"
      >
        <img
          :src="section.content"
          class="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div
          class="absolute inset-0 border-2 border-accent/0 group-hover/img:border-accent/40 transition-all duration-500 pointer-events-none"
        ></div>
      </div>
    </div>

    <!-- Grid d'informations techniques -->
    <div
      class="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 border-t border-accent/10 pt-8 opacity-0 animate-fade-in"
      :style="{
        animationDelay: 1000 + (project.sections?.length || 0) * 200 + 'ms',
      }"
    >
      <div class="space-y-6">
        <div class="flex items-center space-x-3">
          <span class="w-3 h-3 bg-accent animate-pulse"></span>
          <span class="term-small uppercase tracking-[0.2em] font-bold text-dim"
            >Tech_Capabilities_Modules</span
          >
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(t, idx) in project.tech"
            :key="t"
            class="px-3 py-1 bg-bg border border-accent/20 text-accent term-small font-mono hover:bg-accent hover:text-bg transition-all duration-300 cursor-default uppercase tracking-wider opacity-0 animate-pop-in"
            :style="{
              animationDelay:
                1200 + (project.sections?.length || 0) * 200 + idx * 100 + 'ms',
            }"
          >
            {{ t }}
          </span>
        </div>
      </div>

      <div
        v-if="project.role"
        class="bg-accent/10 p-6 border-l-4 border-accent relative overflow-hidden group opacity-0 animate-fade-in"
        :style="{
          animationDelay: 1500 + (project.sections?.length || 0) * 200 + 'ms',
        }"
      >
        <!-- Background decorative text -->
        <div
          class="absolute -right-4 -bottom-2 text-[40px] font-black text-accent/5 select-none pointer-events-none uppercase"
        >
          AUTHORITY
        </div>

        <div
          class="text-[11px] uppercase tracking-widest font-bold text-dim mb-3 relative z-10"
        >
          Role_Authority_Level
        </div>
        <div class="text-fg font-black tracking-tight text-xl relative z-10">
          {{ project.role }}
        </div>
      </div>
    </div>

    <!-- Actions Footer -->
    <div
      class="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 opacity-0 animate-fade-in"
      :style="{
        animationDelay: 1800 + (project.sections?.length || 0) * 200 + 'ms',
      }"
    >
      <!-- Bouton Retour -->
      <button
        @click="$emit('run-command', 'projets')"
        class="group/back flex items-center space-x-4 px-6 py-3 border border-accent/20 hover:border-accent/50 bg-accent/5 hover:bg-accent/10 transition-all duration-300 relative overflow-hidden cursor-pointer"
      >
        <div
          class="absolute inset-0 translate-x-[-100%] group-hover/back:translate-x-0 bg-accent/5 transition-transform duration-500 ease-out"
        ></div>
        <span
          class="text-accent group-hover/back:-translate-x-1 transition-transform duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </span>
        <span
          class="text-accent font-black tracking-[0.3em] term-small uppercase relative z-10"
        >
          LISTE DES PROJETS
        </span>
      </button>

      <!-- Lien d'action -->
      <a
        v-if="project.url && project.url !== '#'"
        :href="project.url"
        target="_blank"
        class="relative group px-8 py-3 bg-accent/10 border border-accent/40 text-accent font-black overflow-hidden transition-all hover:bg-accent hover:text-bg w-full sm:w-auto text-center"
      >
        <div
          class="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 bg-accent transition-transform duration-300 ease-out -z-10"
        ></div>
        <div
          class="flex items-center justify-center space-x-3 tracking-[0.2em] term-small"
        >
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
  0% {
    top: 0;
  }
  100% {
    top: 100%;
  }
}
</style>
