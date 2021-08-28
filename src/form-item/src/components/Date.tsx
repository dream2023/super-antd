import type { ProFormItemProps } from '@ant-design/pro-form';
import { ProFormDatePicker } from '@ant-design/pro-form';
import type { DatePickerProps } from 'antd/lib/date-picker';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperDateProps = CreateSuperFormItemProps<ProFormItemProps<DatePickerProps>>;
export const SuperDate = createSuperFormItem<ProFormItemProps<DatePickerProps>>(ProFormDatePicker, {
  placeholderPrefix: '请选择',
});
SuperDate.displayName = 'SuperDate';

export default SuperDate;
