<script setup>
import { computed } from "vue";
import InfoWidget from "./InfoWidget.vue";
import { commandRegistry } from "../utils/terminalCommands";

const getCommandResult = (name) => {
  const cmd = commandRegistry.find((c) => c.name === name);
  return cmd ? cmd.handler() : [];
};

const aboutLines = computed(() => {
  const lines = getCommandResult("a-propos");
  const textLines = lines.filter((l) => l.type === "text");
  if (textLines.length > 0) return textLines;

  // Fallback : on extrait la bio de la variante visuelle si elle existe
  const variant = lines.find((l) => l.type === "about-variant");
  if (variant && variant.data && variant.data.bio) {
    return [{ type: "text", content: variant.data.bio }];
  }
  return [];
});
const projectLines = computed(() =>
  getCommandResult("projets").filter((l) => l.type === "project"),
);
const contactLines = computed(() =>
  getCommandResult("contact").filter((l) => l.type === "contact-row"),
);

const skillLines = [
  { type: "text", content: "FRONTEND" },
  { type: "text", content: "├── VUE.JS / VITE", class: "opacity-70 ml-2" },
  { type: "text", content: "├── REACT / NEXT.JS", class: "opacity-70 ml-2" },
  { type: "text", content: "└── TAILWIND CSS V4", class: "opacity-70 ml-2" },
  { type: "text", content: "BACKEND" },
  { type: "text", content: "├── NODE.JS / EXPRESS", class: "opacity-70 ml-2" },
  { type: "text", content: "├── POSTGRESQL / SQL", class: "opacity-70 ml-2" },
  { type: "text", content: "└── SUPABASE / AUTH", class: "opacity-70 ml-2" },
  { type: "text", content: "AUTOMATION" },
  { type: "text", content: "├── N8N WORKFLOWS", class: "opacity-70 ml-2" },
  { type: "text", content: "└── MAKE / ZAPIER", class: "opacity-70 ml-2" },
];
</script>

<template>
  <div
    class="hidden lg:flex flex-col shrink-0 h-full border-l border-border px-5 pt-3 space-y-6 overflow-y-auto side-panel bg-transparent"
  >
    <!-- Panel Header -->
    <div
      class="flex items-center justify-between mb-6 opacity-60 stagger-load"
      style="animation-delay: 1800ms"
    >
      <div class="flex items-center space-x-2">
        <div class="w-2 h-2 bg-accent animate-pulse"></div>
        <span class="term-small font-bold tracking-[0.2em] uppercase"
          >Data Monitor</span
        >
      </div>
      <span class="term-smallfont-mono">STABLE_V1.2</span>
    </div>

    <!-- About Widget -->
    <InfoWidget
      title="USER_BIO"
      colorClass="border-accent/40"
      titleBgClass="bg-accent"
      :lines="aboutLines.filter((l) => l.type === 'text')"
      :delay="2000"
    />

    <!-- Projects Widget -->
    <InfoWidget
      title="PROJECTS.bat"
      colorClass="border-orange/40"
      titleBgClass="bg-orange"
      :lines="projectLines"
      :delay="2300"
    />

    <!-- Skills Widget -->
    <InfoWidget
      title="SKILLS.md"
      colorClass="border-cyan/40"
      titleBgClass="bg-cyan"
      :lines="skillLines"
      :delay="2600"
    />

    <!-- Contact Widget -->
    <InfoWidget
      title="CONTACT_nodes"
      colorClass="border-err/40"
      titleBgClass="bg-err"
      :lines="contactLines"
      :delay="2900"
    />

    <!-- Decorative bottom text -->
    <div
      class="mt-auto opacity-20 term-small font-mono leading-tight uppercase tracking-widest stagger-load"
      style="animation-delay: 3200ms"
    >
      Core_Net // Thomas_OS<br />
      Grid_Status: [ONLINE]<br />
      Secure_Tunnel: active
    </div>
  </div>
</template>

<style scoped>
.side-panel {
  scrollbar-width: thin;
  scrollbar-color: var(--accent-border) transparent;
}
.side-panel::-webkit-scrollbar {
  width: 4px;
}
.side-panel::-webkit-scrollbar-track {
  background: transparent;
}
.side-panel::-webkit-scrollbar-thumb {
  background: var(--accent-border);
  border-radius: 2px;
}
.side-panel::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
}
</style>
