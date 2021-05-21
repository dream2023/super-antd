import React from 'react';
import type { FC, Key } from 'react';

type OptionsProps = {
  // options 属性
  options?: number | string | { label: Key; value: any } | Record<Key, any>;
  // options key 映射对象
  optionsProp?: { labelKey?: string; valueKey?: string };
  // 当 options 改变后请求值
  clearValueAfterOptionsChange?: boolean;
};

const OptionDemo: FC<OptionsProps> = () => <div>demo</div>;

export default OptionDemo;
