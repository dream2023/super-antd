import dayjs from 'dayjs';

import { isArray, isBoolean, isNumber, isString } from './utils/is';

// 转为 json 字符串
export const json = (data: any, tabSize?: number) => {
  return JSON.stringify(data, null, tabSize);
};

// 转为数字
export const toNumber = (val?: unknown) => {
  if (isString(val)) return Number(val);
  return val;
};

// 转为整数
export const toInt = (val?: unknown) => {
  if (isString(val) || isNumber(val)) return parseInt(String(val), 10);
  return val;
};

// 转为浮点数
export const toFloat = (val?: unknown) => {
  if (isString(val)) return parseFloat(val);
  return val;
};

// 将数值转为千分位
export const toPrice = (val?: unknown) => {
  if (isNumber(val)) {
    return String(val).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
  }

  return val;
};

// 去空格
export const trim = (val?: unknown) => {
  if (isString(val)) return val.trim();
  return val;
};

// 日期
export const date = (val?: unknown, template: string = 'YYYY-MM-DD') => {
  if (dayjs(val as any).isValid()) return dayjs(val as any).format(template);
  return val;
};

// 百分数
export const toPercent = (val?: unknown, decimals: number = 0) => {
  let res = val;
  if (isNumber(res)) {
    res = (res * 100).toFixed(decimals);
    res += '%';
    return res;
  }
  return res;
};

// 四舍五入
export const round = (val: unknown) => {
  if (isNumber(val)) return Math.round(val);
  return val;
};

// 截取字符串
export const truncate = (val: unknown, length: number = 200, mask: string = '...') => {
  if (isString(val) && val.length >= length) return val.slice(0, length) + mask;
  return val;
};

// 分割数组
export const split = (val: unknown, delimiter = ',') => {
  if (isString(val)) return val.split(delimiter);
  return val;
};

// 连接数组
export const join = (val: unknown, glue = ',') => {
  if (isArray(val)) return val.join(glue);
  return val;
};

// 求和
export const sum = (val: unknown) => {
  if (isArray(val)) {
    return val.reduce((acc, cur) => acc + Number(cur), 0);
  }
  return val;
};

// 转正数
export const abs = (val: unknown) => {
  if (isNumber(val)) return Math.abs(val);
  return val;
};

// 转为小写
export const toLowerCase = (val: unknown) => {
  if (isString(val)) return val.toLowerCase();
  return val;
};

// 转为大写
export const toUpperCase = (val: unknown) => {
  if (isString(val)) return val.toUpperCase();
  return val;
};

// 真值条件过滤器
export const isTrue = (val: unknown, trueValue: any, falseValue: any) => {
  if (isBoolean(val)) return val ? trueValue : falseValue;
  return val;
};

// 真值条件过滤器
export const isTruly = (val: unknown, trueValue: any, falseValue: any) => {
  return val ? trueValue : falseValue;
};

// 假值条件过滤器
export const isFalse = (val: unknown, falseValue: any, trueValue: any) => {
  if (isBoolean(val)) return val ? trueValue : falseValue;
  return val;
};

// 假值条件过滤器
export const isFalsely = (val: unknown, falseValue: any, trueValue: any) => {
  return val ? trueValue : falseValue;
};
