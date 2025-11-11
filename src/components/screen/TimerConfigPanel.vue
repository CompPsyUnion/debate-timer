<template>
  <dialog ref="modalRef" class="modal">
  <div class="modal-box w-[30vw] max-w-[1200px] h-[90vh] flex flex-col">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-2xl font-bold config-header">辩论计时器配置</h3>
        <div class="flex gap-2">
          <div class="tabs tabs-boxed">
            <button type="button" class="tab" :class="{ 'tab-active': editMode === 'visual' }" @click="editMode = 'visual'">可视化编辑</button>
            <button type="button" class="tab" :class="{ 'tab-active': editMode === 'json' }" @click="editMode = 'json'">JSON源码</button>
          </div>
          <button class="btn btn-sm btn-circle btn-ghost" @click="emitClose">✕</button>
        </div>
      </div>

      <div class="flex-1 overflow-hidden">
        <div v-if="editMode === 'visual'" class="h-full overflow-y-auto pr-2">
          <div class="space-y-4">
            <div v-for="(stage, index) in localStages" :key="index" class="card bg-base-200 shadow-sm">
              <div class="card-body p-4">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-bold text-lg">阶段 {{ index + 1 }}</h4>
                  <button class="btn btn-sm btn-error btn-ghost" @click="removeStage(index)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    删除阶段
                  </button>
                </div>

                <div class="form-control mb-3">
                  <label class="label">
                    <span class="label-text font-medium">阶段名称</span>
                  </label>
                  <input
                    v-model="stage.stageName"
                    type="text"
                    placeholder="例如：立论阶段 - 正方"
                    class="input input-bordered"
                  />
                </div>

                <div class="form-control mb-3">
                  <label class="label cursor-pointer justify-start gap-2">
                    <input v-model="stage.isDualSide" type="checkbox" class="checkbox" />
                    <span class="label-text">双边计时（两个计时器交替使用）</span>
                  </label>
                </div>

                <div class="form-control mb-3">
                  <label class="label cursor-pointer justify-start gap-2">
                    <input v-model="stage.hideTimer" type="checkbox" class="checkbox" />
                    <span class="label-text">隐藏计时器（只显示发言者名称）</span>
                  </label>
                </div>

                <div class="divider">发言者配置</div>
                <div class="space-y-3">
                  <div v-for="(side, sideIndex) in stage.sides" :key="sideIndex" class="flex gap-3 items-end">
                    <div class="form-control flex-1">
                      <label class="label">
                        <span class="label-text">
                          {{ stage.isDualSide ? (sideIndex === 0 ? '正方' : '反方') : '发言者' }} 名称
                        </span>
                      </label>
                      <input
                        v-model="side.name"
                        type="text"
                        placeholder="例如：正方一辩"
                        class="input input-bordered input-sm"
                      />
                    </div>
                    <div class="form-control w-32">
                      <label class="label">
                        <span class="label-text">时长（秒）</span>
                      </label>
                      <input
                        v-model.number="side.duration"
                        type="number"
                        min="1"
                        placeholder="180"
                        class="input input-bordered input-sm"
                      />
                    </div>
                    <button
                      v-if="stage.sides.length > 1"
                      class="btn btn-sm btn-ghost btn-error"
                      @click="removeSide(index, sideIndex)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    v-if="!stage.isDualSide || stage.sides.length < 2"
                    class="btn btn-sm btn-outline"
                    @click="addSide(index)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    添加发言者
                  </button>
                </div>

                <div class="divider">响铃配置</div>
                <div class="space-y-3">
                  <div v-for="(bell, bellIndex) in stage.bellTimings" :key="bellIndex" class="flex gap-3 items-end">
                    <div class="form-control flex-1">
                      <label class="label">
                        <span class="label-text">响铃时间（秒）</span>
                      </label>
                      <input
                        v-model.number="bell.time"
                        type="number"
                        min="0"
                        placeholder="从阶段开始计时"
                        class="input input-bordered input-sm"
                      />
                    </div>
                    <div class="form-control w-40">
                      <label class="label">
                        <span class="label-text">铃声类型</span>
                      </label>
                      <select v-model="bell.type" class="select select-bordered select-sm">
                        <option value="start">开始铃</option>
                        <option value="warning">提醒铃</option>
                        <option value="end">结束铃</option>
                      </select>
                    </div>
                    <button class="btn btn-sm btn-ghost btn-error" @click="removeBell(index, bellIndex)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <button class="btn btn-sm btn-outline" @click="addBell(index)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    添加响铃
                  </button>
                </div>
              </div>
            </div>

            <button class="btn btn-primary btn-block" @click="addStage">
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

      <div class="flex justify-end gap-2 mt-4 pt-4 border-t">
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
    <form method="dialog" class="modal-backdrop">
      <button>关闭</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { TimerStage } from '@/types/screen';

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
}>();

const modalRef = ref<HTMLDialogElement | null>(null);
const editMode = ref<'visual' | 'json'>('visual');
const localStages = ref<TimerStage[]>([]);
const jsonSource = ref('');
const jsonError = ref('');
const saveError = ref('');

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
      modalRef.value?.showModal();
    } else {
      modalRef.value?.close();
    }
  },
  { immediate: true },
);

const emitClose = () => {
  emit('close');
};

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

const addSide = (stageIndex: number) => {
  const stage = localStages.value[stageIndex];
  if (!stage) return;

  if (stage.isDualSide && stage.sides.length >= 2) {
    return;
  }

  stage.sides.push({
    name: stage.isDualSide ? (stage.sides.length === 0 ? '正方' : '反方') : '发言者',
    duration: 180,
  });
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
    if (!stage.stageName.trim()) {
      saveError.value = '阶段名称不能为空';
      return;
    }
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
  emit('save', payload);

  // 立即把新的配置加载到当前页面（父组件通常会在收到 save 事件时更新传入的 props），
  // 然后关闭右侧 modal，并通知父组件 modal 已关闭
  saveError.value = '';
  modalRef.value?.close();
  emit('close');
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
