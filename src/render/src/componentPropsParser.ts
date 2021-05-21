import type { SchemaRenderContextProps } from 'react-schema-render';

import { isPlainObject, isString } from '@/shared';

// 内部的 componentProps（一个全局变量）
export type ComponentPropsType = Record<string, Record<any, any>>;

// 解析器
export const componentPropsParser = (schema: Record<any, any>, context: SchemaRenderContextProps) => {
  const { componentProps } = context;

  if (componentProps && isString(schema.component) && isPlainObject(componentProps[schema.component])) {
    return { ...componentProps[schema.component], ...schema };
  }
  return schema;
};
