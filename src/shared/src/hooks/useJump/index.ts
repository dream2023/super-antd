import { usePersistFn } from 'ahooks';
import type { History } from 'history';
import { useHistory } from 'react-router-dom';

import { isString } from '../../utils/is';

export interface UrlObj {
  url: string;
  target?: string;
  replace?: boolean;
}

export type JumpTarget = string | UrlObj;

const jump = (history: History, jumpTarget: JumpTarget) => {
  const newJumpTarget = isString(jumpTarget) ? { url: jumpTarget } : jumpTarget;
  const { url, target = '_self', replace } = newJumpTarget;
  // 如果以 http 或者 history 不存在
  if (url.startsWith('http')) {
    window.open(url, target, undefined, replace);
    return;
  }

  if (replace) {
    history.replace(url);
  } else {
    history.push(url);
  }
};

export function useJump() {
  const history = useHistory();
  const jumpFn = usePersistFn((jumpTarget: JumpTarget) => {
    jump(history, jumpTarget);
  });

  return jumpFn;
}
