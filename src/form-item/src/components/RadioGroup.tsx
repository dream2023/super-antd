import { ProFormRadio } from '@ant-design/pro-form';
import type { ProFormRadioGroupProps } from '@ant-design/pro-form/lib/components/Radio';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItemWithOptions } from '../createSuperFormItem';

export type SuperRadioGroupProps = CreateSuperFormItemProps<ProFormRadioGroupProps>;
export const SuperRadioGroup = createSuperFormItemWithOptions<ProFormRadioGroupProps>(ProFormRadio.Group);
SuperRadioGroup.displayName = 'SuperRadioGroup';

export default SuperRadioGroup;
