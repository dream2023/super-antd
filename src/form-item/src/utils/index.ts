import { compilerStr } from '@dream2023/data-mapping';
import type { NamePath } from 'antd/lib/form/interface';
import type { ReactNode } from 'react';

import { isFunction, isString, isUndefined } from '@/shared';

// 字符串或者函数
export type LinkageFunctionType = ((data: Record<any, any>) => any) | string;

interface GetLinkageValueOptions {
  // 数据
  data: Record<any, any>;
  // 用户传递的值
  value?: any;
  // 联动函数
  linkageFn?: LinkageFunctionType;
  // 分隔符
  delimiters?: [string, string];
}

// 转换联动函数
export function getLinkageValue({ data, value, linkageFn, delimiters }: GetLinkageValueOptions): boolean | undefined {
  // 为空则返回
  if (isUndefined(value) && isUndefined(linkageFn)) return undefined;

  let res;
  // 如果存在默认值，则使用默认值
  if (!isUndefined(value)) {
    res = value;
  } else if (isString(linkageFn)) {
    // 如果是字符串，则编译字符串
    res = compilerStr(linkageFn, { data }, delimiters);
  } else if (isFunction(linkageFn)) {
    // 如果是函数，则执行函数
    res = linkageFn(data);
  }

  return !!res;
}

// 获取对立的值
export function getOppositionValue(val1?: boolean, val2?: boolean) {
  if (!isUndefined(val1)) return val1;
  if (!isUndefined(val2)) return !val2;
  return undefined;
}

/** 获取 placeholder 当用户没有自定义 placeholder 时，并且存在 label ，则根据 label自动拼接为 placeholder */

interface GetPlaceholderOptions {
  label?: ReactNode;
  autoPlaceholder?: boolean;
  placeholderPrefix?: string;
  messageVariables?: Record<string, any>;
}
export function getPlaceholder({
  label,
  autoPlaceholder,
  messageVariables = {},
  placeholderPrefix = '',
}: GetPlaceholderOptions): string | undefined {
  // 如果开启自动 placeholder，且 label 存在
  if (autoPlaceholder && (isString(messageVariables.label) || isString(label))) {
    let placeholderStr = '';
    if (isString(messageVariables.label)) {
      placeholderStr = messageVariables!.label;
    } else if (isString(label)) {
      placeholderStr = label;
    }

    return `${placeholderPrefix}${placeholderStr}`;
  }
  return undefined;
}

/**
 * 获取名称
 *
 * 此方法主要为支持 'info.age' 转为 ['info', 'age']。
 *
 * @example
 *   getName('info.age') => ['info', 'age']
 */
export function getName(name?: NamePath): NamePath | undefined {
  if (isString(name)) {
    const nameArr = name.split('.').filter((item) => item);
    if (nameArr.length > 1) return nameArr;
  }

  return name;
}

/**
 * 获取标签。
 *
 * 主要解决无标签时，用 ' ' 空字符串代替，而不是 undefined。 因为 label 为 undefined 时，不会渲染内容，导致 labelCol 失效，进而导致无法对齐。
 *
 * @example
 *   getLabel('姓名', undefined, true, false); // => ' '
 *   getLabel(undefined); // => ' '
 *
 * @param label 标签
 * @param colon Label 后面的冒号
 * @param hideLabel 是否隐藏标签
 * @param formHideLabel 是否全表单隐藏
 */
export function getLabel({
  layout,
  label,
  colon,
  hideLabel,
  formHideLabel,
}: {
  layout?: string;
  label?: ReactNode;
  colon?: boolean;
  hideLabel?: boolean;
  formHideLabel?: boolean;
}): ReactNode {
  if (formHideLabel) return undefined;
  return hideLabel || (label === undefined && colon === undefined && layout !== 'vertical') ? ' ' : label;
}

/**
 * 获取 colon
 *
 * 其作用是搭配上面 getLabel 使用的，当 label 为空字符串时，如果有 : 会显得很难看 所以，当 label 为空字符串时，将其设置为 false。
 */
export function getColon({
  layout,
  label,
  colon,
  hideLabel,
  formHideLabel,
}: {
  layout?: string;
  label?: ReactNode;
  colon?: boolean;
  hideLabel?: boolean;
  formHideLabel?: boolean;
  }): boolean | undefined {
  return formHideLabel || hideLabel || (label === undefined && colon === undefined && layout !== 'vertical')
    ? false
    : colon;
}
