import { ProFormColorPicker } from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import type { InputNumberProps } from 'antd/lib/input-number';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

type ProFormColorProps = ProFormItemProps<InputNumberProps> & {
  min?: InputNumberProps['min'];
  max?: InputNumberProps['max'];
};

export type SuperColorProps = CreateSuperFormItemProps<ProFormColorProps>;
export const SuperColor = createSuperFormItem<ProFormColorProps>(ProFormColorPicker, {
  defaultMockRule: '@color',
});
SuperColor.displayName = 'SuperColor';

export default SuperColor;
