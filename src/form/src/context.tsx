import type { FormInstance } from 'antd';
import type { Key } from 'react';
import { createContext } from 'react';

import type { FormItemNeedsProps } from './types';

export interface SuperFormContextProps<Values extends Record<Key, any> = any> extends FormItemNeedsProps {
  form?: FormInstance<Values>;
  /** Layout */
  layout?: 'horizontal' | 'vertical' | 'inline';
  /** 服务端返回的错误 */
  remoteErrors: Record<string, any>;
  itemCount?: number;
  initialValues?: Record<string, any>;
}

// 表单 context
export const SuperFormContext = createContext<SuperFormContextProps>({
  hideLabel: false,
  remoteErrors: {},
});
