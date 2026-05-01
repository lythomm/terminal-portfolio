<script setup>
import { ref, onMounted } from "vue";
import GlitchText from "./GlitchText.vue";

const props = defineProps({
  title: String,
  colorClass: {
    type: String,
    default: "border-accent",
  },
  titleBgClass: {
    type: String,
    default: "bg-accent",
  },
  lines: {
    type: Array,
    default: () => [],
  },
  delay: {
    type: Number,
    default: 0,
  },
});

const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, props.delay);
});
</script>

<template>
  <div
    v-if="isVisible"
    :class="[
      'border border-l-4 p-5 relative mb-8 last:mb-0 bg-surface/40 group hover:bg-surface/60 transition-all duration-300 stagger-load',
      colorClass,
    ]"
  >
    <!-- Title Bar -->
    <div
      :class="[
        'absolute -top-3.5 left-0 px-4 text-bg font-bold text-sm  tracking-widest flex items-center h-7 select-none clip-path-tab',
        titleBgClass,
      ]"
    >
      <GlitchText :text="title" :delay="200" :duration="600" />
      <div class="ml-2 flex space-x-1">
        <div class="w-1 h-1 bg-bg/40 rounded-full animate-pulse"></div>
      </div>
    </div>

    <!-- Content -->
    <div class="mt-1 space-y-3 relative z-10">
      <div
        v-for="(line, idx) in lines"
        :key="idx"
        class="term-main leading-relaxed"
      >
        <!-- Simple Text -->
        <div
          v-if="line.type === 'text'"
          :class="[line.class, 'text-fg text-base font-medium']"
        >
          <GlitchText
            :text="line.content"
            :delay="300 + idx * 100"
            :duration="800"
          />
        </div>

        <!-- Project Item -->
        <div
          v-else-if="line.type === 'project'"
          class="flex flex-col space-y-1.5 py-2 border-b border-border/10 last:border-0 group/item"
        >
          <div class="flex justify-between items-baseline">
            <span
              class="text-fg font-bold uppercase tracking-tight text-base group-hover/item:text-orange transition-colors"
            >
              <GlitchText
                :text="line.name"
                :delay="400 + idx * 100"
                :duration="700"
              />
            </span>
            <span class="text-dim term-secondary font-medium tabular-nums">
              <GlitchText
                :text="line.year"
                :delay="500 + idx * 100"
                :duration="500"
              />
            </span>
          </div>
          <div class="flex flex-wrap gap-1.5 pt-1">
            <span
              v-for="(tech, tIdx) in typeof line.stack === 'string'
                ? line.stack.split(' / ')
                : line.stack"
              :key="tIdx"
              class="term-small px-2 py-0.5 border border-dim/20 rounded-xs text-dim/80 group-hover/item:border-orange/40 group-hover/item:text-orange/90 transition-all duration-300 font-bold uppercase tracking-wider bg-white/5 animate-pop-in opacity-0"
              :style="{ animationDelay: 800 + idx * 300 + tIdx * 150 + 'ms' }"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <!-- Contact Item -->
        <div
          v-else-if="line.type === 'contact-row'"
          class="flex group/contact py-2"
        >
          <span
            class="w-[100px] text-dim uppercase tracking-tighter term-label font-bold opacity-70 mb-1"
          >
            <GlitchText
              :text="line.label"
              :delay="400 + idx * 100"
              :duration="500"
            />
          </span>
          <a
            v-if="line.url"
            :href="line.url"
            target="_blank"
            class="text-accent transition-colors truncate text-base font-medium hover:underline"
          >
            <GlitchText
              :text="line.content"
              :delay="500 + idx * 100"
              :duration="800"
            />
          </a>
          <span v-else class="text-fg truncate text-base font-medium">
            <GlitchText
              :text="line.content"
              :delay="500 + idx * 100"
              :duration="800"
            />
          </span>
        </div>
      </div>
    </div>

    <!-- Decorative Corner Detail -->
    <div
      :class="['absolute bottom-0 right-0 w-2 h-2 opacity-30', colorClass]"
      style="border-right-width: 2px; border-bottom-width: 2px"
    ></div>
  </div>
</template>

<style scoped>
.text-bg {
  color: var(--bg);
}

.clip-path-tab {
  clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
  padding-right: 1.5rem;
}

/* Custom border overrides for consistent cyberpunk look */
.border-accent\/40 {
  border-color: rgba(74, 222, 128, 0.4);
  border-left-color: #4ade80;
}
.border-orange\/40 {
  border-color: rgba(232, 133, 74, 0.4);
  border-left-color: #e8854a;
}
.border-cyan\/40 {
  border-color: rgba(0, 255, 204, 0.4);
  border-left-color: #00ffcc;
}
.border-err\/40 {
  border-color: rgba(209, 96, 96, 0.4);
  border-left-color: #d16060;
}
</style>
