import type { ProFormItemProps } from '@ant-design/pro-form';
import { ProFormText } from '@ant-design/pro-form';
import type { PasswordProps } from 'antd/lib/input/Password';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperPasswordProps = CreateSuperFormItemProps<ProFormItemProps<PasswordProps>>;
export const SuperPassword = createSuperFormItem<ProFormItemProps<PasswordProps>>(ProFormText.Password, {
  placeholderPrefix: '请输入',
});
SuperPassword.displayName = 'SuperPassword';

export default SuperPassword;
