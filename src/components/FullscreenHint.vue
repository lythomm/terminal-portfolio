<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["close"]);
</script>

<template>
  <Transition
    enter-active-class="transition duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div v-if="show" class="mb-8 max-w-[340px] relative isolate">
      <!-- Background with blur -->
      <div
        class="absolute inset-0 bg-black/60 rounded-xs border border-accent/30 shadow-[0_0_50px_rgba(74,222,128,0.15)] -z-10"
      ></div>

      <div class="relative p-6">
        <button
          @click="$emit('close')"
          class="absolute top-3 right-3 text-dim hover:text-accent transition-colors cursor-pointer w-5 h-5 flex items-center justify-center border border-transparent hover:border-accent/30 rounded-xs"
        >
          ×
        </button>
        <div class="flex items-start space-x-4">
          <div
            class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-accent/10 border border-accent/20 rounded-xs text-accent text-xl font-bold"
          >
            !
          </div>
          <div class="space-y-2">
            <p class="dim-text term-main leading-relaxed">
              Pour une immersion totale, il est vivement recommandé d'activer le
              mode plein écran.
            </p>
            <div class="flex flex-wrap gap-2 mt-4">
              <div
                class="px-2 py-1 bg-white/5 border border-white/10 rounded-xs term-label font-mono flex items-center"
              >
                <span class="dim-text mr-2 border-r border-white/10 pr-2"
                  >WIN</span
                >
                F11
              </div>
              <div
                class="px-2 py-1 bg-white/5 border border-white/10 rounded-xs text-[10px] font-mono flex items-center"
              >
                <span class="dim-text mr-2 border-r border-white/10 pr-2"
                  >MAC</span
                >
                ⌃ + ⌘ + F
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Little pointer arrow -->
      <div
        class="w-3 h-3 bg-black/60 border-r border-b border-accent/30 rotate-45 mx-auto -mt-1.5"
      ></div>
    </div>
  </Transition>
</template>
