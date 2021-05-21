// 将字符串转为对象
import type { Key } from 'react';

import { isPlainObject } from '../../utils/is';
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
function changeProp(option: Record<Key, any>, optionsProp: OptionsProp = {}): OptionObj {
  return {
    label: option[optionsProp.labelKey || 'label'],
    value: option[optionsProp.valueKey || 'value'],
  };
}

// 获取 options
export const getOptions = (options: OptionItemType[] = [], optionsProp?: OptionsProp): OptionObj[] => {
  return options.map((option: OptionItemType) => {
    const objOption = strToOption(option);
    return changeProp(objOption, optionsProp);
  });
};
