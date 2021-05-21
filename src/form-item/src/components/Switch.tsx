import { ProFormSwitch } from '@ant-design/pro-form';
import type { ProFormSwitchProps } from '@ant-design/pro-form/lib/components/Switch';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperSwitchProps = CreateSuperFormItemProps<ProFormSwitchProps>;
export const SuperSwitch = createSuperFormItem<ProFormSwitchProps>(ProFormSwitch, {
  defaultMockRule: '@boolean',
});
SuperSwitch.displayName = 'SuperSwitch';

export default SuperSwitch;
