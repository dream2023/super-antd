import { setFilters } from '@dream2023/data-mapping';
import { useEventEmitter } from 'ahooks';
import type { FC } from 'react';
import React from 'react';
import { SchemaProvider } from 'react-schema-render';

import type { CommunicationEventEmitterOptions } from '@/shared/src/hooks/useCommunication/types';

import type { SuperAntdContextProps } from './context';
import { SuperAntdContext } from './context';

export const SuperProvider: FC<SuperAntdContextProps> = ({
  children,

  // axios 相关
  axios,
  errorNotify,
  successNotify,

  // mockjs
  mockjs,

  // 数据映射
  filters,
  delimiters,

  // 解析 schema 相关
  parsers,
  components,
  componentProps,
  componentDecorator,
  ...resetProps
}) => {
  // 设置过滤器
  if (filters) {
    setFilters(filters);
  }

  const component$ = useEventEmitter<CommunicationEventEmitterOptions>();

  return (
    <SuperAntdContext.Provider value={{ component$, mockjs, delimiters, axios, successNotify, errorNotify }}>
      <SchemaProvider
        {...resetProps}
        parsers={parsers}
        components={components}
        componentProps={componentProps}
        componentDecorator={componentDecorator}
      >
        {children}
      </SchemaProvider>
    </SuperAntdContext.Provider>
  );
};

export default SuperProvider;
