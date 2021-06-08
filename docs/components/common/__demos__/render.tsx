import type { FC } from 'react';
import React from 'react';

export interface ISchemaRenderProps {
  /** Schema 对象。可以为数组或者对象。 例如 { component: 'input', name: 'foo', label: 'bar' } */
  schema?: Record<any, any> | Record<any, any>[];
}

const Demo: FC<ISchemaRenderProps> = () => <>Demo!</>;

export default Demo;
