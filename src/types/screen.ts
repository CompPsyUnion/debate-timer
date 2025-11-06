/**
 * Screen timer related types
 * 保留前端大屏所需的最小类型定义
 */

export interface BellTiming {
  time: number; // 在第几秒播放铃声
  type: 'start' | 'warning' | 'end'; // 铃声类型
}

export interface TimerSide {
  name: string; // 发言者名称
  duration: number; // 时长（秒）
  currentTime?: number; // 当前时间（秒）
  isRunning?: boolean; // 是否正在计时
}

export interface TimerStage {
  stageName: string; // 阶段名称，例如 "立论阶段"、"质询阶段"
  isDualSide: boolean; // 是否为双方计时器
  sides: TimerSide[]; // 计时器侧面（1个或2个）
  bellTimings: BellTiming[]; // 铃声时机配置
  hideTimer?: boolean; // 是否隐藏计时器（只显示发言者名称）
}

export interface TimerData {
  activityName: string; // 活动名称
  debateTitle: string; // 辩题
  stages: TimerStage[]; // 多个计时器阶段
  timestamp?: string;
}
