import classnames from 'classnames';

import { isObject, isPlainObject } from '@/shared';

// 解析器
export const classNameParser = (schema: Record<any, any>) => {
  if (isPlainObject(schema) && isObject(schema.className)) {
    return { ...schema, className: classnames(schema.className) };
  }
  return schema;
};
