import { ProFormRadio } from '@ant-design/pro-form';
import type { ProFormRadioGroupProps } from '@ant-design/pro-form/lib/components/Radio';
import type { Mockjs } from 'mockjs';

import { mockRadio } from '@/shared';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItemWithOptions } from '../createSuperFormItem';

export type SuperRadioGroupProps = CreateSuperFormItemProps<ProFormRadioGroupProps>;
export const SuperRadioGroup = createSuperFormItemWithOptions<ProFormRadioGroupProps>(ProFormRadio.Group, {
  defaultMockRule: (props: ProFormRadioGroupProps) => {
    return (Mock: Mockjs) => mockRadio(Mock, props.options || []);
  },
});
SuperRadioGroup.displayName = 'SuperRadioGroup';

export default SuperRadioGroup;
