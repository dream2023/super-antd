import classnames from 'classnames';

import { isObject, isString } from '@/shared';

// 解析器
export const classNameParser = (schema: Record<any, any>) => {
  if (isString(schema.component) && isObject(schema.className)) {
    return { ...schema, className: classnames(schema.className) };
  }
  return schema;
};
