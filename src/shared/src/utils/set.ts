import type { Key } from 'react';

import { isPlainObject } from './is';
import { toPathArr } from './util';

const isUnsafeKey = (key: Key) => {
  return key === '__proto__' || key === 'constructor' || key === 'prototype';
};

const validateKey = (key: Key) => {
  if (isUnsafeKey(key)) {
    throw new Error(`Cannot set unsafe key: "${key}"`);
  }
};

const setProp = (obj: Record<Key, any>, prop: Key, value: any) => {
  validateKey(prop);

  const res = obj;
  if (value === undefined) {
    delete res[prop];
  } else {
    res[prop] = value;
  }

  return res;
};

export const set = (obj: Record<Key, any>, path?: Key | Key[], value?: any) => {
  if (!path) return obj;
  if (!isPlainObject(obj)) return obj;
  let res = obj;
  const keys = toPathArr(path);
  const len = keys.length;
  const target = obj;

  for (let i = 0; i < len; i += 1) {
    const key = keys[i];
    const next = keys[i + 1];

    validateKey(key);

    if (next === undefined) {
      setProp(res!, key, value);
      break;
    }

    if (typeof next === 'number' && !Array.isArray(res[key])) {
      res[key] = [];
      res = res[key];
    } else {
      if (!isPlainObject(res[key])) {
        res[key] = {};
      }

      res = res[key];
    }
  }

  return target;
};
