import type { ProFormItemProps } from '@ant-design/pro-form';
import { ProFormText } from '@ant-design/pro-form';
import type { InputProps } from 'antd';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperTextProps = CreateSuperFormItemProps<ProFormItemProps<InputProps>>;

export const createInput = () =>
  createSuperFormItem<ProFormItemProps<InputProps>>(ProFormText, {
    placeholderPrefix: '请输入',
  });

const SuperInput = createInput();
SuperInput.displayName = 'SuperInput';

const SuperEmail = createInput();

SuperEmail.displayName = 'SuperEmail';
SuperEmail.defaultProps = {
  rules: [{ type: 'email' }],
};

const SuperUrl = createInput();
SuperUrl.displayName = 'SuperUrl';
SuperUrl.defaultProps = {
  rules: [{ type: 'url' }],
};

export { SuperInput, SuperEmail, SuperUrl };
export type { SuperTextProps as SuperInputProps, SuperTextProps as SuperEmailProps, SuperTextProps as SuperUrlProps };
export default SuperInput;
