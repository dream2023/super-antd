import { ProFormSelect } from '@ant-design/pro-form';
import type { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';

import type { CreateSuperFormItemWithOptionsProps } from '../createSuperFormItem';
import { createSuperFormItemWithOptions } from '../createSuperFormItem';

export type SuperSelectProps = CreateSuperFormItemWithOptionsProps<ProFormSelectProps>;
export const SuperSelect = createSuperFormItemWithOptions<ProFormSelectProps>(ProFormSelect, {
  placeholderPrefix: '请选择',
});

SuperSelect.displayName = 'SuperSelect';
export default SuperSelect;
