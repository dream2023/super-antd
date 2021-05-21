import type { ProFormCaptchaProps } from '@ant-design/pro-form';
import { ProFormCaptcha } from '@ant-design/pro-form';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperCaptchaProps = CreateSuperFormItemProps<ProFormCaptchaProps>;
export const SuperCaptcha = createSuperFormItem<ProFormCaptchaProps>(ProFormCaptcha, {
  placeholderPrefix: '请输入',
});
SuperCaptcha.displayName = 'SuperCaptcha';

export default SuperCaptcha;
