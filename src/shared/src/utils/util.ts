import type { ColProps } from 'antd/lib/col';
import type { Key } from 'react';

import { isArray, isNil, isPlainObject } from './is';

/**
 * 将任意类型转为数组
 *
 * @example
 *   castToArray(); // => []
 *   castToArray(123); // [123]
 *   castToArray([123]); // [123]
 */
export function castToArray(val: unknown): any[] {
  if (isNil(val)) {
    return [];
  }

  return isArray(val) ? val : [val];
}

export type Col = ColProps | number | string;

/**
 * 将 string 或者 number 转为 ColProps 类型
 *
 * @example
 *   getCol(2) // => { span: 2 }
 *   getCol('2') // => { span: '2' }
 *   getCol({ span: 2 }) => // { span: 2 }
 */
export function getCol(col?: Col): ColProps | undefined {
  if (!isNil(col)) {
    return isPlainObject(col) ? col : { span: col };
  }

  return col;
}

// 下一帧
export function nextTick(fn: () => void) {
  return Promise.resolve().then(fn);
}

// 空函数
export type NoopType = () => void;
export const NOOP: NoopType = () => {};

export const toPathArr = (path: Key | Key[]) =>
  isArray(path)
    ? path
    : String(path)
        .replace(/\[([^[\]]*)\]/g, '.$1.')
        .split('.')
        .filter((t) => t !== '');

// lodash get
export const get = (obj?: Record<Key, any>, path?: Key | Key[]) => {
  if (!path) return obj;
  if (!isPlainObject(obj)) return obj;

  return toPathArr(path).reduce((prev, cur) => prev && prev[cur], obj);
};

// lodash omit
export const omit = (obj?: Record<Key, any>, arr?: any[]) => {
  if (!arr || !isPlainObject(obj)) return obj;

  return Object.keys(obj)
    .filter((k) => !arr.includes(k))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
};
