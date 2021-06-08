import { Skeleton } from 'antd';
import type { FC, Key } from 'react';
import React from 'react';
import { SchemaRender } from 'react-schema-render';
import warning from 'tiny-warning';

import type { ApiType } from '@/shared';
import { isArray, isPlainObject } from '@/shared';
import { useAxios } from '@/shared';
import { __DOCS_URL__ } from '@/shared/src/constants';

/** 从远程加载组件 */
export const SchemaApiToComponent: FC<{ api?: ApiType }> = ({ api }) => {
  const { data, loading } = useAxios({ api });
  if (loading) {
    return <Skeleton active />;
  }

  if (data) {
    if (isArray(data) || isPlainObject(data)) {
      return <SchemaRender schema={data}></SchemaRender>;
    }

    warning(
      false,
      `[super-antd]: 远程 schema 数据类型不正确，期待为 Object 或者 Array 类型，实际数据为 ${JSON.stringify(
        data,
      )}，具体说明请看 ${__DOCS_URL__}/super-antd/guide/concept/schema`,
    );
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
