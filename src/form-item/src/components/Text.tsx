import { ProFormText } from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import type { InputProps } from 'antd';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperTextProps = CreateSuperFormItemProps<ProFormItemProps<InputProps>>;

export const createInput = ({ defaultMockRule }: { defaultMockRule?: any }) =>
  createSuperFormItem<ProFormItemProps<InputProps>>(ProFormText, {
    defaultMockRule,
    placeholderPrefix: '请输入',
  });

const SuperInput = createInput({ defaultMockRule: '@string' });
SuperInput.displayName = 'SuperInput';

const SuperEmail = createInput({
  defaultMockRule: '@email',
});

SuperEmail.displayName = 'SuperEmail';
SuperEmail.defaultProps = {
  rules: [{ type: 'email' }],
};

const SuperUrl = createInput({
  defaultMockRule: '@url',
});
SuperUrl.displayName = 'SuperUrl';
SuperUrl.defaultProps = {
  rules: [{ type: 'url' }],
};

export { SuperInput, SuperEmail, SuperUrl };
export type { SuperTextProps as SuperInputProps, SuperTextProps as SuperEmailPorps, SuperTextProps as SuperUrlProps };
export default SuperInput;
