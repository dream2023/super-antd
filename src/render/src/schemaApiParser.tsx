import { Skeleton } from 'antd';
import type { FC, Key } from 'react';
import React from 'react';
import { SchemaRender } from 'react-schema-render';

import type { ApiType } from '@/shared';
import { useAxios } from '@/shared';

/** 从远程加载组件 */
export const SchemaApiToComponent: FC<{ api?: ApiType }> = ({ api }) => {
  const { data, loading } = useAxios({ api });
  if (loading) {
    return <Skeleton active />;
  }

  if (data) {
    return <SchemaRender schema={data}></SchemaRender>;
  }

  return null;
};

// 加载远程配置，并生成组件
export const schemaApiParser = (schema: Record<Key, any>) => {
  const { schemaApi, ...resetJsonSchema } = schema;
  // 判断是否需要从远程加载
  if (schemaApi) {
    resetJsonSchema.children = <SchemaApiToComponent api={schemaApi}></SchemaApiToComponent>;
  }

  return resetJsonSchema;
};
