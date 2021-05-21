import { compilerStr } from '@dream2023/data-mapping';
import { useCreation } from 'ahooks';
import type { CSSProperties, FC, Key } from 'react';
import React, { useContext } from 'react';

import { SuperFormContext } from '@/form';
import { SuperAntdContext } from '@/provider';
import { isString } from '@/shared';

export interface SuperTplProps {
  value?: unknown;
  className?: string;
  data?: Record<Key, any>;
  style?: CSSProperties;
  isHtml?: boolean;
}

export const SuperTpl: FC<SuperTplProps> = ({ value, className, data, isHtml, style }) => {
  const context = useContext(SuperAntdContext);
  const { form } = useContext(SuperFormContext);

  const computedValue = useCreation(() => {
    const formData = form?.getFieldsValue();
    return isString(value) ? compilerStr(value, { data: data || formData }, context.delimiters) : value;
  }, [value, context, form]);

  if (isHtml) {
    return <div className={className} style={style} dangerouslySetInnerHTML={{ __html: String(computedValue) }}></div>;
  }
  return (
    <div style={style} className={className}>
      {String(computedValue)}
    </div>
  );
};

export default SuperTpl;
