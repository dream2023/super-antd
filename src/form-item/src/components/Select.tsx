import { ProFormSelect } from '@ant-design/pro-form';
import type { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import type { Mockjs } from 'mockjs';

import { mockCheckbox, mockRadio } from '@/shared';

import type { CreateSuperFormItemWithOptionsProps } from '../createSuperFormItem';
import { createSuperFormItemWithOptions } from '../createSuperFormItem';

export type SuperSelectProps = CreateSuperFormItemWithOptionsProps<ProFormSelectProps>;
export const SuperSelect = createSuperFormItemWithOptions<ProFormSelectProps>(ProFormSelect, {
  placeholderPrefix: '请选择',
  defaultMockRule: (props: ProFormSelectProps) => {
    return (Mock: Mockjs) =>
      props.fieldProps?.mode === 'multiple' || props.fieldProps?.mode === 'tags'
        ? mockCheckbox(Mock, props.options || [])
        : mockRadio(Mock, props.options || []);
  },
});

SuperSelect.displayName = 'SuperSelect';
export default SuperSelect;
