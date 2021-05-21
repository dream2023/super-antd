import { ProFormDatePicker } from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import type { DatePickerProps } from 'antd/lib/date-picker';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperYearProps = CreateSuperFormItemProps<ProFormItemProps<DatePickerProps>>;
export const SuperYear = createSuperFormItem<ProFormItemProps<DatePickerProps>>(ProFormDatePicker.Year, {
  placeholderPrefix: '请选择',
  defaultMockRule: '@date',
});
SuperYear.displayName = 'SuperYear';

export default SuperYear;
