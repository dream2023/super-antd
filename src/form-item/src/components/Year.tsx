import type { ProFormItemProps } from '@ant-design/pro-form';
import { ProFormDatePicker } from '@ant-design/pro-form';
import type { DatePickerProps } from 'antd/lib/date-picker';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperYearProps = CreateSuperFormItemProps<ProFormItemProps<DatePickerProps>>;
export const SuperYear = createSuperFormItem<ProFormItemProps<DatePickerProps>>(ProFormDatePicker.Year, {
  placeholderPrefix: '请选择',
});
SuperYear.displayName = 'SuperYear';

export default SuperYear;
