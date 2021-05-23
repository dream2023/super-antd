import { ProFormCheckbox } from '@ant-design/pro-form';
import type { ProFormCheckboxGroupProps } from '@ant-design/pro-form/lib/components/Checkbox';
import type { Mockjs } from 'mockjs';

import { mockCheckbox } from '@/shared';

import type { CreateSuperFormItemWithOptionsProps } from '../createSuperFormItem';
import { createSuperFormItemWithOptions } from '../createSuperFormItem';

export type SuperCheckboxGroupProps = CreateSuperFormItemWithOptionsProps<ProFormCheckboxGroupProps>;
export const SuperCheckboxGroup = createSuperFormItemWithOptions<ProFormCheckboxGroupProps>(ProFormCheckbox.Group, {
  defaultMockRule: (props: Omit<ProFormCheckboxGroupProps, 'options'> & { options?: { label: string, value: any }[] }) => {
    return (Mock: Mockjs) => mockCheckbox(Mock, props.options);
  },
});
SuperCheckboxGroup.displayName = 'SuperCheckboxGroup';

export default SuperCheckboxGroup;
