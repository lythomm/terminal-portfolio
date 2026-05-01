<script setup>
import { ref, computed } from "vue";
import LineSkills from "./lines/LineSkills.vue";
import LineProjectDetail from "./lines/LineProjectDetail.vue";
import LineAbout from "./lines/LineAbout.vue";
import LineExperience from "./lines/LineExperience.vue";

const isExpanded = ref(false);

const props = defineProps({
  line: {
    type: Object,
    required: true,
  },
});

defineEmits(["run-command"]);

const filteredSections = computed(() => {
  const sections = [];

  // Prioritize top-level description as DESC
  if (props.line.description) {
    sections.push({
      label: "DESC",
      type: "text",
      content: props.line.description,
    });
  }

  // Add ROLE and STATUS from sections if they exist
  if (props.line.sections) {
    const otherSections = props.line.sections.filter((s) =>
      ["ROLE", "STATUS", "STATUT"].includes(s.label.toUpperCase()),
    );

    // Filter out sections that would be duplicates if we already added them from top-level
    // Actually, let's just use the sections if they exist, otherwise top-level.
    // But the user specifically said "description plutôt que mission".

    // Let's refine:
    // 1. DESC (from line.description)
    // 2. ROLE (from section ROLE, or line.role if section missing)
    // 3. STATUS (from section STATUS/STATUT, or line.fullStatus if missing)

    const hasRoleSection = props.line.sections.some(
      (s) => s.label.toUpperCase() === "ROLE",
    );
    const hasStatusSection = props.line.sections.some((s) =>
      ["STATUS", "STATUT"].includes(s.label.toUpperCase()),
    );

    if (hasRoleSection) {
      sections.push(
        props.line.sections.find((s) => s.label.toUpperCase() === "ROLE"),
      );
    } else if (props.line.role) {
      sections.push({ label: "ROLE", type: "text", content: props.line.role });
    }

    if (hasStatusSection) {
      sections.push(
        props.line.sections.find((s) =>
          ["STATUS", "STATUT"].includes(s.label.toUpperCase()),
        ),
      );
    } else if (props.line.fullStatus) {
      sections.push({
        label: "STATUS",
        type: "text",
        content: props.line.fullStatus,
      });
    }
  } else {
    // No sections at all, fallback to top-level fields
    if (props.line.role)
      sections.push({ label: "ROLE", type: "text", content: props.line.role });
    if (props.line.fullStatus)
      sections.push({
        label: "STATUS",
        type: "text",
        content: props.line.fullStatus,
      });
  }

  return sections;
});
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

    <!-- Experience Logs -->
    <LineExperience
      v-else-if="line.type === 'experience-logs'"
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
      class="group relative py-2 px-4 hover:bg-accent/5 transition-colors border border-transparent hover:border-accent/10 mb-2"
    >
      <div
        class="grid grid-cols-[1fr_80px_1.5fr_100px] gap-4 items-center cursor-pointer select-none group"
        @click="isExpanded = !isExpanded"
      >
        <div class="flex items-center space-x-3">
          <span
            class="text-accent term-secondary transition-transform duration-300"
            :class="{
              'rotate-90': isExpanded,
              'opacity-0 group-hover:opacity-100': !isExpanded,
            }"
            >→</span
          >
          <span
            class="text-fg font-bold uppercase tracking-tight group-hover:text-accent transition-colors duration-300 group-hover:underline"
            >{{ line.name }}</span
          >
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

      <!-- Expanded Content -->
      <div
        v-if="isExpanded"
        class="mt-6 ml-8 border-l-2 border-accent/20 pl-8 py-4 space-y-6 animate-unfold-y"
      >
        <div class="space-y-3">
          <!-- Dynamic Sections -->
          <div
            v-for="(section, sIdx) in filteredSections"
            :key="sIdx"
            class="grid grid-cols-[100px_1fr] gap-4 items-start animate-fade-in-delayed"
            :style="{ animationDelay: 0.4 + sIdx * 0.15 + 's' }"
          >
            <span
              class="dim-text uppercase tracking-[0.3em] term-small font-bold"
              >{{ section.label }}</span
            >
            <div class="text-fg/80 term-small leading-relaxed max-w-2xl">
              <!-- Simple Text -->
              <div v-if="section.type === 'text'">
                {{ section.content }}
              </div>

              <!-- List -->
              <ul v-else-if="section.type === 'list'" class="space-y-1">
                <li
                  v-for="(item, iIdx) in section.content"
                  :key="iIdx"
                  class="flex items-start space-x-2"
                >
                  <span class="text-accent/40 mt-1">↳</span>
                  <span>{{ item }}</span>
                </li>
              </ul>

              <!-- Image -->
              <div
                v-else-if="section.type === 'image'"
                class="mt-2 group/img relative inline-block"
              >
                <img
                  :src="section.content"
                  class="max-w-md w-full border border-accent/20 grayscale hover:grayscale-0 transition-all duration-500 shadow-[0_0_15px_rgba(74,222,128,0.1)]"
                />
                <div
                  class="absolute inset-0 border border-accent/0 group-hover/img:border-accent/40 transition-all duration-300 pointer-events-none"
                ></div>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <div
            class="pt-4 border-t border-accent/5 animate-fade-in-delayed"
            :style="{
              animationDelay:
                0.4 + (filteredSections?.length || 0) * 0.15 + 's',
            }"
          >
            <button
              @click.stop="$emit('run-command', 'ouvrir ' + line.id)"
              class="group/btn flex items-center cursor-pointer space-x-3 border border-accent/30 px-5 py-2 hover:bg-accent/10 transition-all duration-300"
            >
              <span class="text-accent/60 font-mono term-small">$</span>
              <div class="flex items-center">
                <span
                  class="text-accent font-bold term-small tracking-[0.2em] animate-typing inline-block whitespace-nowrap overflow-hidden"
                  :style="{
                    animationDelay:
                      0.6 + (filteredSections?.length || 0) * 0.15 + 's',
                  }"
                >
                  ouvrir {{ line.id }}
                </span>
                <span
                  class="w-2 h-4 bg-accent ml-1 animate-cursor-blink"
                  :style="{
                    animationDelay:
                      1.4 + (filteredSections?.length || 0) * 0.15 + 's',
                  }"
                ></span>
              </div>
            </button>
          </div>
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
      @run-command="(cmd) => $emit('run-command', cmd)"
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
.animate-unfold-y {
  animation: unfold-y 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transform-origin: top;
}

@keyframes unfold-y {
  from {
    transform: scaleY(0);
    opacity: 0;
  }
  to {
    transform: scaleY(1);
    opacity: 1;
  }
}

.animate-fade-in-delayed {
  opacity: 0;
  animation: fade-in-delayed 0.5s ease-out 0.4s forwards;
}

@keyframes fade-in-delayed {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-typing {
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  animation: typing 0.8s steps(30, end) forwards;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.animate-cursor-blink {
  animation: cursor-blink 1s step-end infinite;
}

@keyframes cursor-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
