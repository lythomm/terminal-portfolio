<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  delay: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 1000
  }
});

const displayedText = ref('');
const characters = '█▓▒░$#@%&*+=?><';
const isComplete = ref(false);

const startGlitch = () => {
  if (!props.text) {
    displayedText.value = '';
    isComplete.value = true;
    return;
  }
  
  isComplete.value = false;
  let iteration = 0;
  const targetText = props.text;
  
  const interval = setInterval(() => {
    displayedText.value = targetText
      .split('')
      .map((char, index) => {
        if (index < iteration) {
          return targetText[index];
        }
        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join('');
    
    if (iteration >= targetText.length) {
      clearInterval(interval);
      isComplete.value = true;
    }
    
    // Increment iteration based on duration
    // 50ms interval means duration/50 steps
    iteration += targetText.length / (props.duration / 50);
  }, 50);
};

onMounted(() => {
  setTimeout(startGlitch, props.delay);
});

watch(() => props.text, () => {
  startGlitch();
});
</script>

<template>
  <span :class="{ 'glitch-active': !isComplete }">
    {{ displayedText }}
  </span>
</template>

<style scoped>
.glitch-active {
  animation: flicker 0.1s infinite;
}

@keyframes flicker {
  0% { opacity: 0.9; }
  50% { opacity: 1; }
  100% { opacity: 0.8; }
}
</style>
