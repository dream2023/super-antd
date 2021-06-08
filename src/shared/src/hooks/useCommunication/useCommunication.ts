import type { noop } from 'ahooks/lib/usePersistFn';
import usePersistFn from 'ahooks/lib/usePersistFn';
import warning from 'tiny-warning';

import { __DOCS_URL__ } from '../../constants';
import type { CommunicationProps } from './types';
import { ActionType } from './types';

interface BasicCommunicationOptions extends CommunicationProps {
  /** Name 自身的名称，要唯一 */
  myName?: string;
  /** 更新目标组件的名称 */
  targetName?: string;
  /** 当发生事件时，我自身需要做什么 */
  doMySelf?: noop;
  /** 动作名称 */
  actionName: ActionType;
}
/** 用于任意组件的通信 总体思路就是广播事件通信的方式，自己既是订阅者，又是发起者 当收到信息时，需要判断是否为自身的消息，如果是，则执行相应的回调函数 自己也可以通过暴露出去的函数，手动发起事件 */
export const useBasicCommunication = ({
  component$,
  myName,
  targetName,
  doMySelf,
  actionName,
}: BasicCommunicationOptions) => {
  // 订阅事件，处理函数
  component$?.useSubscription(({ name: doName, action, data }) => {
    // 判断是否为自己，如果是自己，则进行相应的操作
    if (doName && doName === myName && doMySelf && actionName === action) {
      doMySelf(data);
    }
  });

  // 发起对 target 的的处理
  const doTarget = usePersistFn((data?: any) => {
    if (component$) {
      if (targetName) {
        component$.emit({
          name: targetName,
          action: actionName,
          data,
        });
      }
    } else {
      warning(
        component$,
        `[super-antd]：请在配置 SuperProvider 组件，具体请看：${__DOCS_URL__}/guide/concept/config#组件通信`,
      );
    }
  });

  return doTarget;
};

interface CommunicationOptions extends CommunicationProps {
  /** 自身的名称，要唯一 */
  myName?: string;
  /** 刷新目标组件的函数 */
  refreshMyself?: noop;
  /** 更新目标组件数据函数 */
  updateMySelfData?: noop;
  /** 刷新目标组件的名称 */
  refreshTargetName?: string;
  /** 更新目标组件的名称 */
  updateTargetName?: string;
}
export const useCommunication = ({
  myName,
  component$,
  refreshMyself,
  updateMySelfData,
  updateTargetName,
  refreshTargetName,
}: CommunicationOptions) => {
  // 刷新目标组件
  const refreshTarget = useBasicCommunication({
    component$,
    myName,
    targetName: refreshTargetName,
    doMySelf: refreshMyself,
    actionName: ActionType.REFRESH,
  });

  // 更新目标组件
  const updateTargetData = useBasicCommunication({
    myName,
    component$,
    targetName: updateTargetName,
    doMySelf: updateMySelfData,
    actionName: ActionType.UPDATE_DATA,
  });

  return {
    updateTargetData,
    refreshTarget,
  };
};
