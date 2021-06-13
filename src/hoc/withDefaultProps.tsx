import type { ComponentType, Key } from 'react';
import React from 'react';

// 默认属性组件
export function withDefaultProps<T extends Record<Key, any> = any>(
  Component: ComponentType<T>,
  defaultProps: T,
): ComponentType<T> {
  return (props: T) => <Component {...Object.assign({}, defaultProps, props)}></Component>;
}

export default withDefaultProps;
