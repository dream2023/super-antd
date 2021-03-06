import { ProFormCheckbox } from '@ant-design/pro-form';
import type { ProFormCheckboxGroupProps } from '@ant-design/pro-form/lib/components/Checkbox';

import type { CreateSuperFormItemWithOptionsProps } from '../createSuperFormItem';
import { createSuperFormItemWithOptions } from '../createSuperFormItem';

export type SuperCheckboxGroupProps = CreateSuperFormItemWithOptionsProps<ProFormCheckboxGroupProps>;
export const SuperCheckboxGroup = createSuperFormItemWithOptions<ProFormCheckboxGroupProps>(ProFormCheckbox.Group);
SuperCheckboxGroup.displayName = 'SuperCheckboxGroup';

export default SuperCheckboxGroup;
