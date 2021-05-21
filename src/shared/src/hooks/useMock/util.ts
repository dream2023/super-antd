import mapObject from 'map-obj';
import type { Mockjs } from 'mockjs';

import { isFunction, isString } from '../../utils/is';
import { set } from '../../utils/set';
import type { MockRules } from './types';

/**
 * 为了解决 key 的问题，需要先转换 mockRules
 *
 * @param mockRules {'foo.bar': '@string'} => { 'foo': {bar: "@string"} }
 * @returns
 */
export function getMockRules(Mock: Mockjs, mockRules: MockRules) {
  // 深度遍历 mockRules
  return mapObject(
    mockRules,
    (key: any, val: any) => {
      if (isString(val) && key.includes('.')) {
        // 'a.b.c' => [a, { b: { c: value }}]
        const keyArr = key.split('.');
        const newKey = keyArr.shift();
        const newValue = set({}, keyArr, 'zhang');
        return [newKey, newValue];
      }
      if (isFunction(val)) {
        // 如果是函数类型的话，则执行函数
        return [key, val(Mock)];
      }
      return [key, val];
    },
    { deep: true },
  );
}

// 获取 Mock 的值
export function getMockValues(Mock: Mockjs, mockRules: MockRules) {
  const changedMockRules = getMockRules(Mock, mockRules);
  return Mock.mock(changedMockRules);
}
