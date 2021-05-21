import type { SchemaRenderProps } from 'react-schema-render';
import { SchemaRender, setParsers } from 'react-schema-render';

import { classNameParser } from './src/classNameParser';
import { componentPropsParser } from './src/componentPropsParser';
import { schemaApiParser } from './src/schemaApiParser';

setParsers([componentPropsParser, schemaApiParser, classNameParser]);

export type SuperRenderProps = SchemaRenderProps;
export const SuperRender = SchemaRender;
SuperRender.displayName = 'SuperRender';

export * from 'react-schema-render';
export * from './src/schemaApiParser';
export * from './src/componentPropsParser';
