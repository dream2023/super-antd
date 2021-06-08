import type { Key } from 'react';

import { getTag } from './getTag';

// 检测类型
export const checkType = (val: unknown, tag: string): boolean => {
  return getTag(val).toLocaleLowerCase() === tag.toLocaleLowerCase();
};

// 是否为普通对象
export const isPlainObject = (val: unknown): val is Record<Key, any> => checkType(val, 'Object');

// 是否为对象
// eslint-disable-next-line @typescript-eslint/ban-types
export const isObject = (val: unknown): val is object => val instanceof Object;

// 是否为 undefined
export const isUndefined = (val: unknown): val is undefined => {
  return val === undefined;
};

// 是否为 null
export const isNull = (val: unknown): val is null => {
  return val === null;
};

// 是否为 undefined 或 null
export const isNil = (val: unknown): val is undefined | null => {
  return isNull(val) || isUndefined(val);
};

// 是否为数字类型
export const isNumber = (val: unknown): val is number => checkType(val, 'Number');

// 是否为 boolean 类型
export const isBoolean = (val: unknown): val is boolean => checkType(val, 'Boolean');

// 是否为字符串类型
export const isString = (val: unknown): val is string => checkType(val, 'String');

// 是否为数组类型
export const isArray = <T = any>(val: unknown): val is T[] => Array.isArray(val);

// 是否为函数类型
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: unknown): val is Function => {
  return typeof val === 'function';
};

// 是否为日期类型
export const isDate = (val: unknown): val is Date => checkType(val, 'Date');
