import type { ProFormItemProps } from '@ant-design/pro-form';
import { ProFormDateTimePicker } from '@ant-design/pro-form';
import type { DatePickerProps } from 'antd/lib/date-picker';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperDateTimeProps = CreateSuperFormItemProps<ProFormItemProps<DatePickerProps>>;
export const SuperDateTime = createSuperFormItem<ProFormItemProps<DatePickerProps>>(ProFormDateTimePicker, {
  placeholderPrefix: '请选择',
});
SuperDateTime.displayName = 'SuperDateTime';

export default SuperDateTime;
