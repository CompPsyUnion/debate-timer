<template>
  <!-- Config and Keyboard Shortcuts -->
  <Transition name="fade">
    <div class="absolute top-4 right-4 flex gap-2 z-50">
      <button class="btn btn-outline btn-sm" @click="openConfig">配置</button>
      <button
        class="btn btn-ghost btn-sm"
        :class="showKeyboardHints ? 'btn-active' : ''"
        @click="showKeyboardHints = !showKeyboardHints"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
        快捷键
      </button>
    </div>
  </Transition>

  <!-- page-level alert -->
  <Transition name="fade">
    <div v-if="pageAlert.show" class="absolute top-20 right-4 z-50">
      <div :class="['alert', pageAlert.type === 'success' ? 'alert-success' : 'alert-error']">
        <span>{{ pageAlert.message }}</span>
      </div>
    </div>
  </Transition>

  <!-- Timer View -->
  <DebateTimer ref="debateTimerRef" :timer-data="timerData" @timer-end="handleTimerEnd" />

  <!-- Keyboard Hints Overlay -->
  <Transition name="fade">
    <div
      v-if="showKeyboardHints"
      class="absolute top-20 right-4 z-30 bg-base-200 rounded-box shadow-xl p-6 border border-base-300"
    >
      <h3 class="text-xl font-bold mb-4">快捷键说明</h3>
      <div class="space-y-2">
        <div class="flex items-center gap-4">
          <kbd class="kbd kbd-sm">Space</kbd>
          <span class="text-gray-400">开始/暂停计时</span>
        </div>
        <div class="flex items-center gap-4">
          <kbd class="kbd kbd-sm">S</kbd>
          <span class="text-gray-400">切换计时侧面</span>
        </div>
        <div class="flex items-center gap-4">
          <kbd class="kbd kbd-sm">R</kbd>
          <span class="text-gray-400">重置计时器</span>
        </div>
        <div class="flex items-center gap-4">
          <kbd class="kbd kbd-sm">←</kbd>
          <span class="text-gray-400">上一阶段</span>
        </div>
        <div class="flex items-center gap-4">
          <kbd class="kbd kbd-sm">→</kbd>
          <span class="text-gray-400">下一阶段</span>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Config Modal -->
  <TimerConfigPanel
    :open="isConfigOpen"
    :activity-name="activityName"
    :debate-title="debateTitle"
    :stages="timerData.stages"
    @close="closeConfig"
    @save="applyConfig"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DebateTimer from '../components/screen/debateTimer.vue';
import TimerConfigPanel from '../components/screen/TimerConfigPanel.vue';
import type { TimerData, TimerStage } from '../types/screen';
import { getDefaultTimerStages } from '../utils/timerDefaults';

const timerData = ref<TimerData>({
  activityName: '测试活动',
  debateTitle: '短暂的陪伴是一种恩赐/惩罚',
  stages: getDefaultTimerStages(),
  timestamp: new Date().toISOString(),
});

const debateTimerRef = ref<InstanceType<typeof DebateTimer> | null>(null);
const showKeyboardHints = ref(false);
const isConfigOpen = ref(false);
const pageAlert = ref({ show: false, type: 'success', message: '' });

const activityName = computed(() => timerData.value.activityName);
const debateTitle = computed(() => timerData.value.debateTitle);

// Timer handler
const handleTimerEnd = (sideIndex: number) => {
  // eslint-disable-next-line no-console
  console.log(`计时器结束: 侧面 ${sideIndex}`);
};

// Config handlers
const openConfig = () => {
  isConfigOpen.value = true;
};

const closeConfig = () => {
  isConfigOpen.value = false;
};

const applyConfig = (payload: { activityName: string; debateTitle: string; stages: TimerStage[] }) => {
  // debug log to confirm parent receives payload
  // eslint-disable-next-line no-console
  console.debug('[Screen] applyConfig', payload);

  timerData.value = {
    activityName: payload.activityName,
    debateTitle: payload.debateTitle,
    stages: payload.stages,
    timestamp: new Date().toISOString(),
  };

  isConfigOpen.value = false;

  // Reset timer after config change
  setTimeout(() => {
    debateTimerRef.value?.handleReset?.();
  }, 100);

  // show page-level success alert
  pageAlert.value = { show: true, type: 'success', message: '配置已保存' };
  setTimeout(() => (pageAlert.value.show = false), 2000);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
