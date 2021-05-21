import type { SelectProps } from 'antd';
import type { Key } from 'react';

import type { ApiType } from '../useAxios';

export type OptionObj = { label: Key; value: any };
export type OptionItemType = Key | OptionObj | Record<Key, any>;
export type OptionsProp = { labelKey?: string; valueKey?: string };
export type OptionList = SelectProps<any>['options'];
export type OptionsType = OptionItemType[] | ApiType;

export interface WithOptions {
  // options 列表
  options?: OptionsType;
  // options Key 的映射
  optionsProp?: OptionsProp;
}

// useOptions 参数定义
export interface IUseOptions extends WithOptions {
  data?: Record<Key, any>;
  hidden?: boolean;
}

export type CreateWidthOptionsComponent<T> = Omit<T, 'options' | 'optionsProp'> & WithOptions;
