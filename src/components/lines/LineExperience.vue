<script setup>
import { computed } from "vue";

const props = defineProps({
  data: {
    type: Object, // { jobs: [], education: [] }
    required: true,
  },
});

// Calculate cumulative delays for jobs
const jobDelays = computed(() => {
  const delays = [];
  let current = 0;
  props.data.jobs.forEach((job) => {
    delays.push(current);
    const descCount = job.descriptions ? job.descriptions.length : 0;
    // Duration: 200ms (header reveal sequence) + (N * 70ms) + 50ms gap
    current += 200 + descCount * 70 + 50;
  });
  return delays;
});

// Calculate when education section should start
const eduSectionDelay = computed(() => {
  if (!props.data.jobs.length) return 100;
  const lastIdx = props.data.jobs.length - 1;
  const lastJob = props.data.jobs[lastIdx];
  const lastDescCount = lastJob.descriptions ? lastJob.descriptions.length : 0;
  // Last job duration + 150ms gap
  return jobDelays.value[lastIdx] + 200 + lastDescCount * 70 + 150;
});

// Calculate cumulative delays for education entries
const eduDelays = computed(() => {
  const delays = [];
  let current = eduSectionDelay.value + 200; // Start after header
  props.data.education.forEach(() => {
    delays.push(current);
    current += 200 + 50; // Entry reveal + gap
  });
  return delays;
});
</script>

<template>
  <div class="space-y-12 animate-fade-in">
    <!-- Jobs Section (Accent Green) -->
    <div class="space-y-4">
      <div
        class="text-accent/40 term-small uppercase tracking-[0.3em] mb-2 font-mono animate-fade-in"
      >
        >> [PRO_EXPERIENCE_LOGS]
      </div>
      <div
        v-for="(exp, idx) in data.jobs"
        :key="'job-' + idx"
        class="font-mono"
      >
        <!-- 1. Period appears first -->
        <div
          class="flex items-center gap-3 term-small opacity-0 animate-fade-in"
          :style="{
            animationDelay: jobDelays[idx] + 'ms',
            animationFillMode: 'both',
          }"
        >
          <span class="text-accent term-secondary">[{{ exp.period }}]</span>
          <span class="text-dim uppercase tracking-widest">Entry_Logged</span>
        </div>

        <div class="flex gap-4 mt-1">
          <!-- 2. Bar descends (origin-top) -->
          <div
            class="w-1 bg-accent/40 animate-scale-y origin-top"
            :style="{
              animationDelay: jobDelays[idx] + 50 + 'ms',
              animationFillMode: 'both',
            }"
          ></div>

          <div>
            <!-- 3. Title reveals -->
            <div
              class="text-fg font-bold uppercase tracking-tighter term-main opacity-0 animate-reveal-text"
              :style="{
                animationDelay: jobDelays[idx] + 100 + 'ms',
                animationFillMode: 'both',
              }"
            >
              {{ exp.role }} <span class="text-accent/60">@</span>
              <a
                v-if="exp.url"
                :href="exp.url"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-accent hover:underline transition-colors duration-200 cursor-pointer pointer-events-auto"
              >
                {{ exp.company }}
              </a>
              <span v-else>{{ exp.company }}</span>
            </div>

            <!-- 4. Descriptions staggered -->
            <div
              v-if="exp.descriptions && exp.descriptions.length"
              class="mt-2 space-y-1"
            >
              <div
                v-for="(desc, dIdx) in exp.descriptions"
                :key="dIdx"
                class="text-dim term-secondary opacity-0 animate-reveal-text"
                :style="{
                  animationDelay: jobDelays[idx] + 150 + dIdx * 70 + 'ms',
                  animationFillMode: 'both',
                }"
              >
                > {{ desc }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Education Section (Cyan) -->
    <div class="space-y-4">
      <div
        class="text-cyan/40 term-small uppercase tracking-[0.3em] mb-2 font-mono opacity-0 animate-fade-in"
        :style="{
          animationDelay: eduSectionDelay + 'ms',
          animationFillMode: 'both',
        }"
      >
        >> [ACADEMIC_RECORDS]
      </div>
      <div
        v-for="(edu, idx) in data.education"
        :key="'edu-' + idx"
        class="font-mono"
      >
        <div
          class="flex items-center gap-3 term-small opacity-0 animate-fade-in"
          :style="{
            animationDelay: eduDelays[idx] + 'ms',
            animationFillMode: 'both',
          }"
        >
          <span class="text-cyan term-secondary">[{{ edu.period }}]</span>
          <span class="text-dim uppercase tracking-widest"
            >Diploma_Registered</span
          >
        </div>

        <div class="flex gap-4 mt-1">
          <div
            class="w-1 bg-cyan/40 animate-scale-y origin-top"
            :style="{
              animationDelay: eduDelays[idx] + 50 + 'ms',
              animationFillMode: 'both',
            }"
          ></div>

          <div>
            <div
              class="text-fg font-bold uppercase tracking-tighter term-main opacity-0 animate-reveal-text"
              :style="{
                animationDelay: eduDelays[idx] + 100 + 'ms',
                animationFillMode: 'both',
              }"
            >
              {{ edu.role }} <span class="text-cyan/60">@</span>
              {{ edu.company }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
