import type { SelectProps } from 'antd';
import type { NamePath } from 'rc-field-form/lib/interface';
import type { Key } from 'react';

import type { ApiType } from '../useAxios';

export type OptionObj = { label: Key; value: any; children?: OptionItemType[] };
export type OptionItemType = Key | OptionObj | Record<Key, any>;
export type OptionsProp = { labelKey?: string; valueKey?: string; childrenKey?: string };
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
  name?: NamePath;
}

export type CreateWidthOptionsComponent<T = any> = Omit<T, 'options' | 'optionsProp'> & WithOptions;
