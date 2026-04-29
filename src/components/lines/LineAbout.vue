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
  <div
    class="animate-fade-in animate-slide-in-bottom duration-1000 will-change-transform-opacity"
  >
    <!-- FINAL VARIANT: SYSTEM_BIOS + CLASSIFIED STAMP -->
    <div
      v-if="variant === 'bios'"
      class="border border-accent/30 p-6 bg-accent/5 font-mono relative group mt-4 overflow-visible"
    >
      <!-- Classified Stamp with Glitch Animation -->
      <div
        class="absolute -top-3 -right-2 transform rotate-12 border-2 border-err/60 text-err px-3 py-1 font-bold term-small uppercase tracking-tighter z-20 bg-bg shadow-[0_0_10px_rgba(239,68,68,0.2)] animate-glitch-slow pointer-events-none will-change-transform"
      >
        Classified_Access
      </div>

      <div
        class="absolute top-0 right-0 p-2 term-small opacity-20 uppercase tracking-widest animate-pulse"
      >
        Auth_Token: 0x992F
      </div>

      <div class="flex flex-col md:flex-row gap-8 relative z-10">
        <div class="shrink-0">
          <div
            class="relative inline-block overflow-hidden rounded-sm group transform-gpu"
          >
            <img
              :src="data.image"
              class="size-72 object-cover border border-accent grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 will-change-transform"
            />
            <!-- Glitch overlay on hover -->
            <div
              class="absolute inset-0 bg-accent/10 mix-blend-overlay opacity-0 group-hover:opacity-100 group-hover:animate-glitch-fast pointer-events-none"
            ></div>

            <div
              class="absolute inset-0 border border-accent/50 animate-pulse pointer-events-none"
            ></div>

            <!-- Optimized scanline using transform instead of background-position -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                class="absolute inset-0 h-[200%] w-full bg-gradient-to-b from-transparent via-accent/10 to-transparent animate-scanline-optimized"
              ></div>
            </div>
          </div>
        </div>

        <div class="flex-grow space-y-4">
          <div class="flex items-center gap-4 overflow-hidden">
            <div
              class="bg-accent text-bg px-2 font-bold uppercase term-small animate-slide-in-left duration-500"
            >
              Subject_ID
            </div>
            <div
              class="text-accent font-bold tracking-widest text-lg animate-slide-in-left delay-100 duration-500"
            >
              THOMAS // DEV
            </div>
          </div>

          <div
            class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 term-small"
          >
            <div
              v-for="(val, label, index) in {
                Role: 'Fullstack Dev',
                Origin: 'Toulouse, FR',
                Status: '● ONLINE',
                XP_LVL: '5.0 YEARS',
              }"
              :key="label"
              class="flex justify-between border-b border-accent/10 pb-1 animate-fade-in animate-slide-in-top"
              :style="{
                animationDelay: index * 150 + 300 + 'ms',
                animationFillMode: 'both',
              }"
            >
              <span class="opacity-40 uppercase text-xs">{{ label }}</span>
              <span
                :class="[
                  'font-bold',
                  label === 'Status' ? 'text-accent animate-pulse' : '',
                ]"
                >{{ val }}</span
              >
            </div>
          </div>

          <p
            class="leading-relaxed term-secondary italic border-l-2 border-accent/20 pl-4 py-1 animate-fade-in animate-slide-in-bottom"
            style="animation-delay: 800ms; animation-fill-mode: both"
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
</style>
