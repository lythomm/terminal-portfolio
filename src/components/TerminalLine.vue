<script setup>
import LineSkills from "./lines/LineSkills.vue";
import LineProjectDetail from "./lines/LineProjectDetail.vue";
import LineAbout from "./lines/LineAbout.vue";

defineProps({
  line: {
    type: Object,
    required: true,
  },
});

defineEmits(["run-command"]);
</script>

<template>
  <div class="mb-4 last:mb-0 cyber-glitch-in">
    <!-- Prompt -->
    <div v-if="line.type === 'prompt'" class="flex items-center term-main mb-4">
      <span class="accent-text mr-2">thomas-portfolio:~$</span>
      <span class="text-fg">{{ line.content }}</span>
    </div>

    <!-- Header -->
    <div
      v-else-if="line.type === 'header'"
      class="accent-text term-main uppercase tracking-widest mb-4 mt-8 first:mt-0 animate-pulse"
    >
      {{ line.content }}
    </div>

    <!-- About Multi-Variant -->
    <LineAbout
      v-else-if="line.type === 'about-variant'"
      :variant="line.variant"
      :data="line.data"
    />

    <!-- ASCII -->
    <pre
      v-else-if="line.type === 'ascii'"
      class="accent-text text-xs leading-none font-mono opacity-80 overflow-x-hidden! ascii-art"
    >
      {{ line.content }}
    </pre>

    <!-- Error -->
    <div v-else-if="line.type === 'error'" class="text-err term-main">
      {{ line.content }}
    </div>
    
    <!-- Image / Profile Picture -->
    <div v-else-if="line.type === 'image'" class="mb-6 mt-2">
      <img 
        :src="line.src" 
        alt="Profile" 
        class="w-48 h-48 object-cover border-2 border-accent/30 rounded-sm shadow-[0_0_15px_rgba(74,222,128,0.2)] grayscale hover:grayscale-0 transition-all duration-500"
      />
    </div>

    <!-- Project Header -->
    <div
      v-else-if="line.type === 'project-header'"
      class="grid grid-cols-[1fr_80px_1.5fr_100px] gap-4 border-b border-border/30 pb-2 px-4"
    >
      <div class="flex items-center space-x-3">
        <span class="w-4"></span>
        <div class="dim-text text-label uppercase tracking-widest">Nom</div>
      </div>
      <div class="dim-text text-label uppercase tracking-widest">Date</div>
      <div class="dim-text text-label uppercase tracking-widest text-center">
        Stack techniques
      </div>
      <div class="dim-text text-label uppercase tracking-widest text-right">
        Statut
      </div>
    </div>

    <!-- Project Item -->
    <div
      v-else-if="line.type === 'project'"
      class="group relative py-2 px-4 hover:bg-accent/5 transition-colors cursor-pointer border border-transparent hover:border-accent/10"
      @click="$emit('run-command', 'ouvrir ' + line.name)"
    >
      <div class="grid grid-cols-[1fr_80px_1.5fr_100px] gap-4 items-center">
        <div class="flex items-center space-x-3">
          <span
            class="text-accent term-secondary opacity-0 group-hover:opacity-100 transition-opacity"
            >→</span
          >
          <span class="text-fg font-bold uppercase tracking-tight">{{
            line.name
          }}</span>
        </div>
        <div class="text-dim term-secondary tabular-nums">{{ line.year }}</div>
        <div class="text-dim term-secondary text-center truncate">
          {{ line.stack }}
        </div>
        <div
          class="text-accent text-small text-right font-bold tracking-widest uppercase text-nowrap"
        >
          {{ line.status }}
        </div>
      </div>
    </div>

    <!-- Experience -->
    <div
      v-else-if="line.type === 'experience'"
      class="flex justify-between items-baseline mb-1 mt-6"
    >
      <div class="flex items-center space-x-3">
        <span class="text-fg font-bold uppercase tracking-tight">{{
          line.role
        }}</span>
        <span class="text-dim/40">@</span>
        <a
          :href="line.url"
          target="_blank"
          class="text-accent hover:underline underline-offset-4"
          >{{ line.company }}</a
        >
      </div>
      <div class="text-dim text-xs tabular-nums">{{ line.period }}</div>
    </div>

    <!-- Description / Bullet points -->
    <div
      v-else-if="line.type === 'desc'"
      class="flex items-start space-x-3 ml-4 mb-1"
    >
      <span class="text-accent/40 mt-1">↳</span>
      <span class="text-fg/70 text-sm leading-relaxed">{{ line.content }}</span>
    </div>

    <!-- Command Help -->
    <div
      v-else-if="line.type === 'command'"
      class="flex items-center space-x-4 ml-2 mb-1 group p-1 rounded-sm"
    >
      <span class="text-accent font-bold min-w-[120px]">{{ line.name }}</span>
      <span class="text-dim/30">|</span>
      <span class="text-fg/60 text-sm italic">{{ line.desc }}</span>
    </div>

    <!-- Skills Frame -->
    <LineSkills
      v-else-if="line.type === 'skills-multi-frame'"
      :modules="line.modules"
    />

    <!-- Project Detail -->
    <LineProjectDetail
      v-else-if="line.type === 'project-detail'"
      :project="line"
    />

    <div
      v-else-if="line.type === 'contact-row'"
      class="font-mono flex items-center w-full max-w-[450px] leading-none mb-0"
    >
      <span class="text-fg opacity-40">│</span>
      <span
        class="px-3 w-[100px] text-dim/60 shrink-0 uppercase tracking-tighter term-label"
        >{{ line.label }}</span
      >
      <span class="text-fg opacity-40">│</span>
      <a
        v-if="line.url"
        :href="line.url"
        target="_blank"
        class="flex-grow px-4 text-accent hover:underline! truncate term-label"
      >
        {{ line.content }}
      </a>
      <span
        v-else
        class="flex-grow px-4 text-fg/80 truncate term-small hover:underline!"
        >{{ line.content }}</span
      >
    </div>

    <!-- Simple Text -->
    <div
      v-else-if="line.type === 'text'"
      :class="[line.class || 'text-fg/90 term-main leading-relaxed']"
    >
      {{ line.content }}
    </div>
  </div>
</template>

<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
