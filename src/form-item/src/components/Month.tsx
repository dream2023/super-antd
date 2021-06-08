import { ProFormDatePicker } from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import type { MonthPickerProps } from 'antd/lib/date-picker';

import type { CreateSuperFormItemWithOptionsProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperMonthProps = CreateSuperFormItemWithOptionsProps<ProFormItemProps<MonthPickerProps>>;
export const SuperMonth = createSuperFormItem<ProFormItemProps<MonthPickerProps>>(ProFormDatePicker.Month, {
  placeholderPrefix: '请选择',
});
SuperMonth.displayName = 'SuperMonth';

export default SuperMonth;
