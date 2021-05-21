import { ProFormDatePicker } from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import type { WeekPickerProps } from 'antd/lib/date-picker';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperWeekProps = CreateSuperFormItemProps<ProFormItemProps<WeekPickerProps>>;
export const SuperWeek = createSuperFormItem<ProFormItemProps<WeekPickerProps>>(ProFormDatePicker.Week, {
  placeholderPrefix: '请选择',
  defaultMockRule: '@date',
});
SuperWeek.displayName = 'SuperWeek';

export default SuperWeek;
