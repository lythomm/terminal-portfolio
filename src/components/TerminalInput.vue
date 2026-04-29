<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: String,
  activeHelp: Array,
  history: Array,
});

const emit = defineEmits(["update:modelValue", "submit", "navigate-history"]);

const inputRef = ref(null);

const handleKeydown = (e) => {
  if (e.key === "Enter") {
    emit("submit");
  } else if (e.key === "ArrowUp") {
    emit("navigate-history", "up");
  } else if (e.key === "ArrowDown") {
    emit("navigate-history", "down");
  }
};

const focus = () => {
  inputRef.value?.focus({ preventScroll: true });
};

defineExpose({ focus });
</script>

<template>
  <div
    class="mt-4 border-t border-border/50 bg-bg/90 backdrop-blur-md pt-4 pb-4 z-40"
  >
    <div class="w-full px-6">
      <!-- Current Input Prompt -->
      <div class="flex items-center term-main">
        <span class="accent-text mr-2 font-bold tracking-tight"
          >thomas-portfolio:~$</span
        >
        <input
          ref="inputRef"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          type="text"
          class="bg-transparent border-none outline-none flex-grow text-fg caret-accent p-0 font-mono placeholder:text-dim/50 term-main"
          placeholder="écrivez une commande (ex: aide)"
          @keydown="handleKeydown"
          spellcheck="false"
          autocomplete="off"
          autofocus
        />
      </div>

      <!-- Active Help Display -->
      <div
        v-if="activeHelp"
        class="mt-4 border-t border-border/50 space-y-1 animate-in fade-in slide-in-from-top-2 duration-500"
      >
        <div v-for="(line, index) in activeHelp" :key="index">
          <!-- Command Help Item -->
          <div
            v-if="line.type === 'command'"
            class="grid grid-cols-[180px_auto] term-small p-1 rounded-xs transition-colors"
          >
            <span class="text-fg font-bold">{{ line.name }}</span>
            <span class="dim-text tracking-tight">// {{ line.desc }}</span>
          </div>

          <!-- Simple Text -->
          <div
            v-else
            :class="[line.class || 'text-fg term-main font-bold mb-4']"
          >
            {{ line.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
