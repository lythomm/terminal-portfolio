<script setup>
defineProps({
  modules: {
    type: Array,
    required: true,
  },
});

const getModuleColor = (title) => {
  if (!title) return "accent";
  const t = title.toUpperCase();
  if (t.includes("FRONTEND")) return "cyan";
  if (t.includes("BACKEND")) return "orange";
  return "accent";
};

const COLOR_MAP = {
  cyan: {
    bg: "bg-cyan",
    bgDim: "bg-cyan/10",
    bgTint: "bg-cyan/5",
    text: "text-cyan",
    border: "border-cyan",
    borderDim: "border-cyan/10",
    shadow: "rgba(0, 255, 204, 0.5)",
  },
  orange: {
    bg: "bg-orange",
    bgDim: "bg-orange/10",
    bgTint: "bg-orange/5",
    text: "text-orange",
    border: "border-orange",
    borderDim: "border-orange/10",
    shadow: "rgba(232, 133, 74, 0.5)",
  },
  accent: {
    bg: "bg-accent",
    bgDim: "bg-accent/10",
    bgTint: "bg-accent/5",
    text: "text-accent",
    border: "border-accent",
    borderDim: "border-accent/10",
    shadow: "rgba(74, 222, 128, 0.5)",
  },
};

const getTheme = (title) => COLOR_MAP[getModuleColor(title)];
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
    <div
      v-for="(module, mIdx) in modules"
      :key="mIdx"
      class="border p-5 relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] animate-draw-border"
      :class="[getTheme(module.title).border + '/40', getTheme(module.title).bgTint]"
      :style="{ animationDelay: mIdx * 500 + 'ms', animationFillMode: 'both' }"
    >
      <!-- Module Header -->
      <div
        class="flex justify-between items-start mb-6 animate-fade-in"
        :style="{
          animationDelay: mIdx * 400 + 400 + 'ms',
          animationFillMode: 'both',
        }"
      >
        <div class="flex items-center space-x-3">
          <div
            class="w-1.5 h-6 animate-scale-y"
            :class="getTheme(module.title).bg"
            :style="{
              animationDelay: mIdx * 400 + 500 + 'ms',
              animationFillMode: 'both',
            }"
          ></div>
          <span
            class="text-fg font-black tracking-[0.2em] uppercase term-main animate-reveal-text"
            :style="{
              animationDelay: mIdx * 400 + 600 + 'ms',
              animationFillMode: 'both',
            }"
          >
            {{ module.title }}
          </span>
        </div>
        <span
          class="term-small font-mono text-dim tracking-tighter opacity-0 animate-fade-in"
          :style="{
            animationDelay: mIdx * 400 + 800 + 'ms',
            animationFillMode: 'both',
          }"
        >
          ID:{{ module.id }}
        </span>
      </div>

      <div class="space-y-5">
        <div
          v-for="(skill, sIdx) in module.skills"
          :key="'s-' + sIdx"
          class="space-y-2"
        >
          <div
            class="flex justify-between items-end opacity-0 animate-fade-in"
            :style="{
              animationDelay: mIdx * 400 + 800 + sIdx * 150 + 'ms',
              animationFillMode: 'both',
            }"
          >
            <div class="flex flex-col">
              <span
                class="text-[10px] font-mono leading-none mb-1 opacity-50"
                :class="getTheme(module.title).text"
                >{{ skill.addr }}</span
              >
              <span
                class="text-fg font-bold uppercase tracking-tight text-label"
                >{{ skill.name }}</span
              >
            </div>
            <div class="text-right">
              <span
                class="text-[10px] font-black italic tracking-widest"
                :class="
                  skill.bar > 90 ? getTheme(module.title).text : 'text-dim'
                "
                >{{ skill.status }}</span
              >
              <div
                class="text-[10px] font-mono opacity-50"
                :class="getTheme(module.title).text"
              >
                {{ skill.bar }}%
              </div>
            </div>
          </div>

          <!-- Block-style progress bar -->
          <div class="flex space-x-1">
            <div
              v-for="b in 20"
              :key="b"
              class="h-1.5 flex-1 opacity-0 animate-pop-in"
              :class="[
                b <= Math.floor(skill.bar / 5)
                  ? getTheme(module.title).bg
                  : getTheme(module.title).bgDim,
              ]"
              :style="{
                animationDelay: mIdx * 400 + 1000 + sIdx * 150 + b * 50 + 'ms',
                animationFillMode: 'both',
                boxShadow:
                  b <= Math.floor(skill.bar / 5)
                    ? `0 0 5px ${getTheme(module.title).shadow}`
                    : 'none',
              }"
            ></div>
          </div>
        </div>
      </div>

      <div
        class="mt-6 pt-3 border-t flex justify-between items-center opacity-0 animate-fade-in"
        :class="getTheme(module.title).borderDim"
        :style="{
          animationDelay: mIdx * 400 + 1500 + 'ms',
          animationFillMode: 'both',
        }"
      >
        <div class="text-[8px] text-dim font-mono uppercase">
          System_Core_Validation_OK
        </div>
        <div class="flex space-x-1">
          <div
            v-for="i in 3"
            :key="i"
            class="w-1 h-1 rounded-full opacity-30"
            :class="getTheme(module.title).bg"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Les animations sont maintenant gérées globalement dans style.css pour la cohérence */
</style>
