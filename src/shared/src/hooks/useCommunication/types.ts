import type { EventEmitter } from 'ahooks/lib/useEventEmitter';

// 操作类型
export enum ActionType {
  // 重新请求接口
  REFRESH,
  // 更新组件数据
  UPDATE_DATA,
}

export type CommunicationEventEmitterOptions<T = any> = {
  // 组件名称
  name?: string | number;
  // 触发动作
  action?: ActionType;
  // 数据
  data?: T;
};

export interface CommunicationProps {
  // 联动实例
  component$?: EventEmitter<CommunicationEventEmitterOptions>;
}
