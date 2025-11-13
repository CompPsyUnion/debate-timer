<template>
  <div class="card bg-base-200 shadow-sm">
    <div class="card-body p-4">
      <div class="flex items-center justify-between mb-3">
        <h4 class="font-bold text-lg card-title">阶段 {{ index + 1 }}</h4>
        <button type="button" class="btn btn-sm btn-error btn-ghost" @click="$emit('remove-stage', index)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          删除阶段
        </button>
      </div>

      <div class="form-control mb-3">
        <label class="card-label">
          <span class="label-text font-medium">阶段名称</span>
        </label>
        <input v-model="stage.stageName" type="text" placeholder="例如：立论阶段 - 正方" class="card-input input-bordered self-end" />
      </div>

      <div class="form-control mb-3">
        <label class="label cursor-pointer justify-start gap-2">
          <input v-model="stage.isDualSide" type="checkbox" class="checkbox" />
          <span class="card-choice label-text">双边计时（两个计时器交替使用）</span>
        </label>
      </div>

      <div class="form-control mb-3">
        <label class="label cursor-pointer justify-start gap-2">
          <input v-model="stage.hideTimer" type="checkbox" class="checkbox" />
          <span class="card-choice label-text">隐藏计时器（只显示发言者名称）</span>
        </label>
      </div>

      <div class="card-subtitle">发言者配置</div>
      <div :key="stage.sides.length" class="speaker overflow-x-auto">
        <table :class="stage.sides.length === 2 ? 'card-table-border-dual' : 'card-table-border-single'"
          class="card-table table table-compact w-full card-table">
          <thead>
            <tr>
              <th class="text-left">发言者名称</th>
              <th class="text-left w-32">时长（秒）</th>
              <th class="text-center w-20" v-if="stage.sides.length > 1">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(side, sideIndex) in stage.sides" :key="sideIndex">
              <td>
                <input v-model="side.name" type="text" placeholder="例如：正方一辩"
                  class="card-input-underline speaker input-bordered input-sm w-full" />
              </td>
              <td>
                <input v-model.number="side.duration" type="number" min="0" default="180" step="30" placeholder="180"
                  class="card-input-underline time input-bordered input-sm w-full" />
              </td>
              <td v-if="stage.sides.length > 1" class="text-center">
                <button type="button" class="btn btn-sm btn-ghost btn-error"
                  @click="$emit('remove-side', index, sideIndex)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div :class="stage.sides.length === 2 ? 'add-speaker-row dual' : 'add-speaker-row single'" class="">
          <button type="button" v-if="stage.sides.length < 2" class="btn btn-sm btn-outline add-speaker-button"
            @click="addSide">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            添加发言者
          </button>
        </div>
      </div>

      <div class="ring-header flex items-center justify-between mb-3">
        <div class="card-subtitle">响铃配置</div>
        <button type="button" class="btn btn-sm btn-outline" @click="$emit('add-bell', index)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          添加响铃
        </button>
      </div>
      <div class="speaker overflow-x-auto" v-if="stage.bellTimings.length > 0">
        <table class="card-table table table-compact w-full card-table">
          <thead>
            <tr>
              <th class="text-left">响铃时间（秒）</th>
              <th class="text-left w-40">铃声类型</th>
              <th class="text-center w-20">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(bell, bellIndex) in stage.bellTimings" :key="bellIndex">
              <td>
                <input v-model.number="bell.time" type="number" min="0" step="30" placeholder="从阶段开始计时"
                  class="card-input-underline time input-bordered input-sm w-full" />
              </td>
              <td>
                <select v-model="bell.type" class="card-input-underline input-bordered input-sm w-full">
                  <option value="start">开始铃</option>
                  <option value="warning">提醒铃</option>
                  <option value="end">结束铃</option>
                </select>
              </td>
              <td class="text-center">
                <button type="button" class="btn btn-sm btn-ghost btn-error"
                  @click="$emit('remove-bell', index, bellIndex)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TimerStage } from '../types/screen';

const props = defineProps<{
  stage: TimerStage;
  index: number;
}>();

const emit = defineEmits<{
  (e: 'remove-stage', index: number): void;
  (e: 'add-side', stageIndex: number): void;
  (e: 'remove-side', stageIndex: number, sideIndex: number): void;
  (e: 'add-bell', stageIndex: number): void;
  (e: 'remove-bell', stageIndex: number, bellIndex: number): void;
}>();

const addSide = () => {
  props.stage.sides.push({ name: '', duration: 180 });
  emit('add-side', props.index);
};
</script>

<style scoped>
/* 如果需要scoped样式，可以添加 */
</style>