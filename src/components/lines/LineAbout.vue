<script setup>
defineProps({
  variant: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="animate-fade-in duration-1000 will-change-transform-opacity">
    <!-- FINAL VARIANT: SYSTEM_BIOS + CLASSIFIED STAMP -->
    <div
      v-if="variant === 'bios'"
      class="p-6 font-mono relative mt-4 overflow-visible"
    >
      <!-- Draw border on a separate layer to avoid clipping the stamp -->
      <div
        class="absolute inset-0 border border-accent/30 bg-accent/5 animate-draw-border -z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]"
      ></div>

      <!-- Classified Stamp with Physical Impact Animation (Appears LAST) -->
      <div
        class="absolute top-5 right-3 border-2 border-err/60 text-err px-3 py-1 font-bold term-label uppercase tracking-tighter z-20 bg-bg shadow-[0_0_10px_rgba(239,68,68,0.2)] opacity-0 animate-stamp pointer-events-none will-change-transform"
        style="animation-delay: 2250ms; animation-fill-mode: both"
      >
        Classified_Access
      </div>

      <div class="flex flex-col md:flex-row gap-8 relative z-10">
        <div
          class="shrink-0 animate-print opacity-0"
          style="animation-delay: 600ms; animation-fill-mode: both"
        >
          <div
            class="relative inline-block overflow-hidden rounded-sm group transform-gpu"
          >
            <img
              :src="data.image"
              class="size-72 object-cover border border-accent grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 will-change-transform"
            />
            <div
              class="absolute inset-0 bg-accent/10 mix-blend-overlay opacity-0 group-hover:opacity-100 group-hover:animate-glitch-fast pointer-events-none"
            ></div>
            <div
              class="absolute inset-0 border border-accent/50 animate-pulse pointer-events-none"
            ></div>
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                class="absolute inset-0 h-[200%] w-full bg-gradient-to-b from-transparent via-accent/10 to-transparent animate-scanline-optimized"
              ></div>
            </div>
          </div>
        </div>

        <div class="flex-grow space-y-6">
          <!-- Main Identity Header -->
          <div class="space-y-1">
            <div
              class="flex items-center gap-3 animate-reveal-text"
              style="animation-delay: 400ms; animation-fill-mode: both"
            >
              <div
                class="bg-accent text-bg px-2 font-bold uppercase term-small"
              >
                Subject_ID
              </div>
              <div
                class="text-accent font-black tracking-widest text-xl uppercase"
              >
                Thomas // Dev
              </div>
            </div>
            <div
              class="text-dim term-small uppercase tracking-[0.2em] animate-reveal-text"
              style="animation-delay: 500ms; animation-fill-mode: both"
            >
              Développeur Fullstack
            </div>
          </div>

          <!-- System Info Grid -->
          <div
            class="grid grid-cols-2 gap-y-4 gap-x-12 border-t border-accent/20 pt-6"
          >
            <div
              v-for="(val, key, idx) in {
                LOCATION: 'Toulouse, FR',
                Status: '● ACTIVE_SESSION',
                XP_LVL: '5.0 YEARS',
                Lieu: 'Remote_Base',
              }"
              :key="key"
              class="flex justify-between items-center border-b border-accent/10 py-1 group/item opacity-0 animate-fade-in"
              :style="{
                animationDelay: 800 + idx * 100 + 'ms',
                animationFillMode: 'both',
              }"
            >
              <span
                class="term-small text-dim uppercase group-hover/item:text-accent transition-colors duration-300"
                >{{ key }}</span
              >
              <span
                class="text-fg font-mono font-bold"
                :class="key === 'Status' ? 'text-accent! animate-pulse' : ''"
                >{{ val }}</span
              >
            </div>
          </div>

          <p
            class="leading-relaxed term-secondary italic border-l-2 border-accent/20 pl-4 py-1 opacity-0 animate-fade-in"
            style="animation-delay: 1400ms; animation-fill-mode: both"
          >
            "{{ data.bio }}"
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes scanline-optimized {
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0%);
  }
}

@keyframes glitch-slow {
  0%,
  100% {
    transform: rotate(12deg) translate3d(0, 0, 0);
    opacity: 0.8;
  }
  92% {
    transform: rotate(12deg) translate3d(0, 0, 0);
  }
  93% {
    transform: rotate(11deg) translate3d(-2px, 1px, 0);
    opacity: 1;
  }
  94% {
    transform: rotate(13deg) translate3d(2px, -1px, 0);
  }
  95% {
    transform: rotate(12deg) translate3d(0, 0, 0);
  }
}

@keyframes glitch-fast {
  0% {
    transform: translate3d(0, 0, 0);
  }
  20% {
    transform: translate3d(-2px, 2px, 0);
  }
  40% {
    transform: translate3d(-2px, -2px, 0);
  }
  60% {
    transform: translate3d(2px, 2px, 0);
  }
  80% {
    transform: translate3d(2px, -2px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

.animate-scanline-optimized {
  animation: scanline-optimized 4s linear infinite;
}

.animate-glitch-slow {
  animation: glitch-slow 5s infinite;
}

.group-hover\:animate-glitch-fast {
  animation: glitch-fast 0.2s infinite;
}

.will-change-transform {
  will-change: transform;
}

.will-change-transform-opacity {
  will-change: transform, opacity;
}

.transform-gpu {
  transform: translateZ(0);
}
@keyframes print-effect {
  0% {
    clip-path: inset(0 0 100% 0);
    opacity: 0;
  }
  1% {
    opacity: 1;
  }
  100% {
    clip-path: inset(0 0 0 0);
    opacity: 1;
  }
}

.animate-print {
  animation: print-effect 1.5s cubic-bezier(0.4, 0, 0.2, 1) both;
}
</style>
