<template>
  <!-- use v-if driven wrapper instead of native <dialog> to avoid dialog API inconsistencies -->
  <!-- fixed overlay that aligns the panel to the right with padding (margins) so it doesn't sit at the bottom -->
  <div
    ref="modalRef"
    v-if="props.open"
    role="dialog"
    aria-modal="true"
  class="fixed inset-0 z-50 flex items-start justify-start p-6 pointer-events-auto"
    @click="onDialogClick"
  >
  <div class="modal-box bg-white w-[45vw] max-w-[1200px] h-[90vh] flex flex-col rounded-lg shadow-2xl">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-2xl font-bold config-header">辩论计时器配置</h3>
        <div class="flex gap-2">
          <div class="tabs tabs-boxed">
            <button type="button" class="tab" :class="{ 'tab-active': editMode === 'visual' }" @click="editMode = 'visual'">可视化编辑</button>
            <button type="button" class="tab" :class="{ 'tab-active': editMode === 'json' }" @click="editMode = 'json'">JSON源码</button>
          </div>
          <button type="button" class="btn btn-sm btn-circle btn-ghost" @click="emitClose">✕</button>
        </div>
      </div>

      <div class="flex-1 overflow-hidden">
        <div v-if="editMode === 'visual'" class="h-full overflow-y-auto">
          <div class="space-y-4">
            <StageCard v-for="(stage, index) in localStages" :key="index" :stage="stage" :index="index" @remove-stage="removeStage" @add-side="addSide" @remove-side="removeSide" @add-bell="addBell" @remove-bell="removeBell" />

            <button type="button" class="btn btn-primary btn-block" @click="addStage">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              添加新阶段
            </button>
          </div>
        </div>

        <div v-else class="h-full flex flex-col">
          <div class="flex-1 relative">
            <textarea
              v-model="jsonSource"
              class="textarea textarea-bordered w-full h-full font-mono text-sm"
              :class="{ 'textarea-error': jsonError }"
              placeholder="编辑JSON配置..."
              @input="validateJSON"
            ></textarea>
            <div v-if="jsonError" class="text-error text-sm mt-1">
              {{ jsonError }}
            </div>
          </div>
        </div>
      </div>

  <div class="flex justify-end gap-2 mt-4 pt-4 border-t modal-actions">
        <div class="flex-1"></div>
        <div class="flex flex-col items-end">
          <div v-if="saveError" class="text-error text-sm mb-2">{{ saveError }}</div>
          <div class="flex gap-2">
            <button type="button" class="btn btn-ghost" @click="emitClose">取消</button>
            <button type="button" class="btn btn-save" @click="handleSave">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              保存配置
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import type { TimerStage } from '../../types/screen';
import StageCard from '../../views/StageCard.vue';

interface EmitPayload {
  activityName: string;
  debateTitle: string;
  stages: TimerStage[];
}

const props = defineProps<{
  open: boolean;
  activityName: string;
  debateTitle: string;
  stages: TimerStage[];
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', payload: EmitPayload): void;
  (e: 'update:open', value: boolean): void;
}>();

// use a generic HTMLElement ref; we no longer rely on native dialog API
const modalRef = ref<HTMLElement | null>(null);
const editMode = ref<'visual' | 'json'>('visual');
const localStages = ref<TimerStage[]>([]);
const jsonSource = ref('');
const jsonError = ref('');
const saveError = ref('');
// child no longer shows alerts — parent will handle page-level alerts

const initialiseForm = () => {
  localStages.value = JSON.parse(JSON.stringify(props.stages)); // Deep copy
  syncToJSON();
};

const syncToJSON = () => {
  jsonSource.value = JSON.stringify(localStages.value, null, 2);
  jsonError.value = '';
};

const syncFromJSON = () => {
  try {
    const parsed = JSON.parse(jsonSource.value);
    if (!Array.isArray(parsed)) {
      throw new Error('配置必须是数组格式');
    }
    localStages.value = parsed;
    jsonError.value = '';
  } catch (error) {
    jsonError.value = error instanceof Error ? error.message : '无效的JSON格式';
  }
};

const validateJSON = () => {
  try {
    JSON.parse(jsonSource.value);
    jsonError.value = '';
  } catch (error) {
    if (error instanceof SyntaxError) {
      jsonError.value = error.message;
    } else {
      jsonError.value = error instanceof Error ? error.message : '无效的JSON格式';
    }
  }
};

watch(editMode, newMode => {
  if (newMode === 'json') {
    syncToJSON();
  } else {
    if (!jsonError.value) {
      syncFromJSON();
    }
  }
});

watch(
  localStages,
  (newStages: TimerStage[]) => {
    newStages.forEach((stage: TimerStage) => {
      if (stage.isDualSide) {
        if (stage.sides.length === 1) {
          const firstSide = stage.sides[0];
          stage.sides.push({
            name: '反方',
            duration: firstSide ? firstSide.duration : 180,
          });
        } else if (stage.sides.length > 2) {
          stage.sides = stage.sides.slice(0, 2);
        }
      }
    });
  },
  { deep: true },
);

watch(
  () => props.open,
  (open: boolean) => {
    if (open) {
      initialiseForm();
    } else {
      // parent controls visibility via prop -> v-if; nothing else needed here
    }
  },
  { immediate: true },
);

/**
 * Close modal in a single place so all callers behave the same.
 * This will close the native <dialog> (if open) and emit the 'close' event
 * so the parent can update its `open` state.
 */
const closeModal = () => {
  // eslint-disable-next-line no-console
  console.debug('[TimerConfigPanel] closeModal called — before close', { modalRef: modalRef.value, propOpen: props.open });

  try {
    if (modalRef.value) {
      // hide element as a defensive fallback in case parent state doesn't update immediately
      try {
        modalRef.value.style.display = 'none';
      } catch (e) {
        // ignore
      }
      try {
        document.body.classList.remove('modal-open');
      } catch (e) {
        // ignore
      }
      // eslint-disable-next-line no-console
      console.debug('[TimerConfigPanel] closeModal applied fallback hide');
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.debug('[TimerConfigPanel] closeModal fallback error', err);
  }

  // Notify parent that modal should be closed
  emit('close');
  // also support v-model style update if parent uses it
  emit('update:open', false);

  // log after
  // eslint-disable-next-line no-console
  console.debug('[TimerConfigPanel] closeModal called — after close', { modalRef: modalRef.value, propOpen: props.open });
};

// kept for template compatibility (used by some buttons)
const emitClose = () => closeModal();

const onDialogClick = (e: MouseEvent) => {
  // if click happened on the dialog backdrop (outside modal-box), close
  if (e.target === modalRef.value) {
    closeModal();
  }
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    if (props.open) {
      closeModal();
    }
  }
};

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
});

const addStage = () => {
  localStages.value.push({
    stageName: '新阶段',
    isDualSide: false,
    sides: [{ name: '发言者', duration: 180 }],
    bellTimings: [
      { time: 0, type: 'start' },
      { time: 150, type: 'warning' },
      { time: 180, type: 'end' },
    ],
    hideTimer: false,
  });
  syncToJSON();
};

const removeStage = (index: number) => {
  if (confirm('确定要删除这个阶段吗？')) {
    localStages.value.splice(index, 1);
    syncToJSON();
  }
};

const addSide = (_stageIndex: number) => {
  // Note: Side is already added by StageCard component, just sync JSON
  syncToJSON();
};

const removeSide = (stageIndex: number, sideIndex: number) => {
  const stage = localStages.value[stageIndex];
  if (!stage) return;

  if (stage.sides.length <= 1) {
    return;
  }
  stage.sides.splice(sideIndex, 1);
  syncToJSON();
};

const addBell = (stageIndex: number) => {
  const stage = localStages.value[stageIndex];
  if (!stage) return;

  stage.bellTimings.push({
    time: 0,
    type: 'warning',
  });
  syncToJSON();
};

const removeBell = (stageIndex: number, bellIndex: number) => {
  const stage = localStages.value[stageIndex];
  if (!stage) return;

  stage.bellTimings.splice(bellIndex, 1);
  syncToJSON();
};

const handleSave = () => {
  saveError.value = '';
  if (editMode.value === 'json') {
    if (jsonError.value) {
      saveError.value = 'JSON 格式错误，请修正后再保存';
      return;
    }
    syncFromJSON();
  }

  if (localStages.value.length === 0) {
    saveError.value = '请至少添加一个阶段';
    return;
  }

  for (const stage of localStages.value) {
    // 阶段名称允许为空（按用户要求关闭“名称为空”校验）
    if (stage.sides.length === 0) {
      saveError.value = '阶段必须至少包含一个发言者';
      return;
    }
    for (const side of stage.sides) {
      if (!side.name.trim()) {
        saveError.value = '发言者名称不能为空';
        return;
      }
      if (side.duration <= 0) {
        saveError.value = '发言时长必须大于 0 秒';
        return;
      }
    }
  }

  const payload = {
    activityName: props.activityName,
    debateTitle: props.debateTitle,
    stages: localStages.value,
  };

  // 发出保存事件，通知父级更新数据
  // debug log: ensure handler is invoked
  // eslint-disable-next-line no-console
  console.debug('[TimerConfigPanel] emitting save', payload);
  emit('save', payload);

  // 立即关闭 modal 并通知父组件；父组件将在 applyConfig 中显示页面级 alert
  closeModal();
};
</script>
<script lang="ts">
// non-setup script block left empty intentionally (style/ts hints)
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: hsl(var(--bc) / 0.2);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--bc) / 0.3);
}
</style>
