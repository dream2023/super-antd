import type { ComponentType, Key } from 'react';

import type { WithDependencyProps } from './hoc/withDependency';
import { withDependency } from './hoc/withDependency';
import type { WithFormItemConfigType } from './hoc/withFormItem';
import { withFormItem } from './hoc/withFormItem';
import type { WithFormItemProps } from './hoc/withFormItemTypes';
import type { WithOptionsConfigType, WithOptionsProps } from './hoc/withOptions';
import { withOptions } from './hoc/withOptions';
import { withMock } from './hoc/withMock'
import type { WithMockProps, WithMockConfigType } from './hoc/withMock'

// 方便别人导出 Props
export type CreateSuperFormItemProps<T> = WithDependencyProps<WithFormItemProps<WithMockProps<T>>>;

// 创建 form-item 组件
export function createSuperFormItem<T extends Record<Key, any>>(
  Component: ComponentType<T>,
  config: WithFormItemConfigType & WithMockConfigType,
) {
  const ComponentWithMock = withMock<T>(Component, config);
  const ComponentWithFormItem = withFormItem<WithMockProps<T>>(ComponentWithMock, config);
  const ComponentWithDependency = withDependency<WithFormItemProps<WithMockProps<T>>>(ComponentWithFormItem);

  return ComponentWithDependency;
}

// 方便别人导出 props
export type CreateSuperFormItemWithOptionsProps<T> = WithDependencyProps<WithFormItemProps<WithOptionsProps<WithMockProps<T>>>>;

// 创建带 options 功能的 form-item
export function createSuperFormItemWithOptions<T extends Record<Key, any>>(
  Component: ComponentType<T>,
  config: WithFormItemConfigType & WithOptionsConfigType & WithMockConfigType = {},
) {
  const ComponentWithMock = withMock<T>(Component, config);
  const ComponentWithOptions = withOptions<WithMockProps<T>>(ComponentWithMock, {
    hasLoadingProp: config.hasLoadingProp,
    needData: config.needData,
  });
  const ComponentWithFormItem = withFormItem<WithOptionsProps<WithMockProps<T>>>(ComponentWithOptions, {
    ...config,
    needData: true,
  });
  const ComponentWithDependency = withDependency<WithFormItemProps<WithOptionsProps<WithMockProps<T>>>>(ComponentWithFormItem);

  return ComponentWithDependency;
}
