import type { FormInstance } from 'antd';
import type { Key } from 'react';
import { createContext } from 'react';

import type { FormItemNeedsProps } from 'super-antd';

export interface SuperFormContextProps<Values extends Record<Key, any> = any> extends FormItemNeedsProps {
  form?: FormInstance<Values>;
  /** 是否 mock */
  isMock?: boolean;
  /** Mock 规则 */
  mockRules: Record<string, any>;
  /** Layout */
  layout?: 'horizontal' | 'vertical' | 'inline';
  /** 服务端返回的错误 */
  remoteErrors: Record<string, any>;
}

// 表单 context
export const SuperFormContext = createContext<SuperFormContextProps>({
  mockRules: {},
  hideLabel: false,
  remoteErrors: {},
});
