import { ProFormColorPicker } from '@ant-design/pro-form';
import type { ProFormColorPickerProps } from '@ant-design/pro-form/lib/components/ColorPicker';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperColorProps = CreateSuperFormItemProps<ProFormColorPickerProps>;
export const SuperColor = createSuperFormItem<ProFormColorPickerProps>(ProFormColorPicker);
SuperColor.displayName = 'SuperColor';

export default SuperColor;
