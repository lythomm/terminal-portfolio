<script setup>
defineProps({
  modules: {
    type: Array,
    required: true,
  },
});

const getProgressBlocks = (percentage) => {
  const totalBlocks = 20;
  const activeBlocks = Math.floor((percentage / 100) * totalBlocks);
  return {
    active: activeBlocks,
    inactive: totalBlocks - activeBlocks
  };
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
    <div
      v-for="(module, mIdx) in modules"
      :key="'mod-' + mIdx"
      class="border border-accent/20 bg-accent/5 p-6 relative cyber-glitch-in group hover:border-accent/40 transition-colors"
      :style="{ animationDelay: mIdx * 150 + 'ms' }"
    >
      <!-- Corner decor -->
      <div class="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent/30 group-hover:border-accent/60 transition-colors"></div>
      
      <div class="flex justify-between items-center mb-6 border-b border-accent/10 pb-3">
        <div class="flex items-center space-x-3">
          <div class="w-1.5 h-6 bg-accent"></div>
          <span class="text-fg font-black tracking-[0.2em] uppercase text-sm">{{ module.title }}</span>
        </div>
        <span class="text-[10px] font-mono text-dim tracking-tighter">ID:{{ module.id }}</span>
      </div>

      <div class="space-y-5">
        <div v-for="(skill, sIdx) in module.skills" :key="'s-' + sIdx" class="space-y-2">
          <div class="flex justify-between items-end">
            <div class="flex flex-col">
              <span class="text-[9px] text-accent/50 font-mono leading-none mb-1">{{ skill.addr }}</span>
              <span class="text-fg font-bold uppercase tracking-tight text-sm">{{ skill.name }}</span>
            </div>
            <div class="text-right">
              <span class="text-[10px] font-black italic tracking-widest" :class="skill.bar > 90 ? 'text-accent' : 'text-dim'">{{ skill.status }}</span>
              <div class="text-[10px] text-accent/40 font-mono">{{ skill.bar }}%</div>
            </div>
          </div>
          
          <!-- Block-style progress bar -->
          <div class="flex space-x-1">
            <div 
              v-for="b in 20" 
              :key="b" 
              class="h-1.5 flex-1 transition-all duration-500"
              :class="[
                b <= Math.floor(skill.bar / 5) 
                  ? 'bg-accent shadow-[0_0_5px_rgba(74,222,128,0.5)]' 
                  : 'bg-accent/10'
              ]"
              :style="{ transitionDelay: (b * 20) + 'ms' }"
            ></div>
          </div>
        </div>
      </div>

      <div class="mt-6 pt-3 border-t border-accent/5 flex justify-between items-center">
        <div class="text-[8px] text-dim font-mono uppercase">System_Core_Validation_OK</div>
        <div class="flex space-x-1">
          <div v-for="i in 3" :key="i" class="w-1 h-1 bg-accent/30 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>
