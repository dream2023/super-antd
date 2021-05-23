import mapObject from 'map-obj';
import type { Mockjs } from 'mockjs';

import { isFunction, isString } from '../../utils/is';
import { set } from '../../utils/set';
import { toPathArr } from '../../utils/util';
import type { MockRules } from './types';

// 获取 Mock 的值
export function getMockValues<T = any>(Mock: Mockjs, mockRules: MockRules): T {
  // 深度遍历 mockRules
  const res: any = mapObject(
    mockRules,
    (key: any, val: any) => {
      if (isString(val)) {
        // 'a.b.c' => [a, { b: { c: value }}]
        const keyArr = toPathArr(key);
        if (keyArr.length <= 1) return [key, Mock.mock(val)]

        const newKey = keyArr.shift(); // 弹出顶级
        const newValue = set({}, keyArr, Mock.mock(val));
        return [newKey, newValue];
      }
      if (isFunction(val)) {
        // 如果是函数类型的话，则执行函数
        return [key, val(Mock)];
      }
      return [key, Mock.mock(val)];
    },
    { deep: true },
  );

  return res as T
}
