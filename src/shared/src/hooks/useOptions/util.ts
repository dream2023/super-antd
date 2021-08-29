// 将字符串转为对象
import type { Key } from 'react';

import { isArray, isPlainObject } from '../../utils/is';
import type { OptionItemType, OptionObj, OptionsProp } from './types';

// '男' => { 'label': '男', 'value': '男' }
function strToOption(option: OptionItemType): Record<Key, any> {
  if (isPlainObject(option)) {
    return option;
  }

  return { label: option, value: option };
}

// 转对象的key
// 例如 option: { name: 'jack', id: 1 }, prop: { labelKey: 'name', valueKey: 'id' }
// 转换后 -> option: { label: '女', value: 1 }
function changeProp(option: Record<Key, any>, optionsProp: OptionsProp = {}, valueIsString = false): OptionObj {
  const val = option[optionsProp.valueKey || 'value'];
  return {
    label: option[optionsProp.labelKey || 'label'],
    value: valueIsString ? String(val) : val,
    children: option[optionsProp.childrenKey || 'children'],
  };
}

// 获取 options
export const getOptions = (
  options: OptionItemType[] = [],
  optionsProp?: OptionsProp,
  valueIsString: boolean = false,
): OptionObj[] => {
  if (!isArray(options)) return [];
  return options.map((option: OptionItemType) => {
    const objOption = strToOption(option);
    const res = changeProp(objOption, optionsProp, valueIsString);
    if (res.children) {
      res.children = getOptions(res.children, optionsProp);
    }
    return res;
  });
};
