import type { ComponentType, Key } from 'react';

import type { WithDependencyProps } from './hoc/withDependency';
import { withDependency } from './hoc/withDependency';
import type { WithFormItemConfigType } from './hoc/withFormItem';
import { withFormItem } from './hoc/withFormItem';
import type { WithFormItemProps } from './hoc/withFormItemTypes';
import type { WithOptionsConfigType, WithOptionsProps } from './hoc/withOptions';
import { withOptions } from './hoc/withOptions';

// 方便别人导出 Props
export type CreateSuperFormItemProps<T = any> = WithDependencyProps<WithFormItemProps<T>>;

// 创建 form-item 组件
export function createSuperFormItem<T extends Record<Key, any> = any>(
  Component: ComponentType<T>,
  config: WithFormItemConfigType = {},
) {
  const ComponentWithFormItem = withFormItem<T>(Component, config);
  const ComponentWithDependency = withDependency<WithFormItemProps<T>>(ComponentWithFormItem);

  return ComponentWithDependency;
}

// 方便别人导出 props
export type CreateSuperFormItemWithOptionsProps<T = any> = WithDependencyProps<WithFormItemProps<WithOptionsProps<T>>>;

// 创建带 options 功能的 form-item
export function createSuperFormItemWithOptions<T extends Record<Key, any> = any>(
  Component: ComponentType<T>,
  config: WithFormItemConfigType & WithOptionsConfigType = {},
) {
  const ComponentWithOptions = withOptions<T>(Component, {
    hasLoadingProp: config.hasLoadingProp,
    needData: config.needData,
  });
  const ComponentWithFormItem = withFormItem<WithOptionsProps<T>>(ComponentWithOptions, {
    ...config,
    needData: true,
  });
  const ComponentWithDependency = withDependency<WithFormItemProps<WithOptionsProps<T>>>(ComponentWithFormItem);

  return ComponentWithDependency;
}
