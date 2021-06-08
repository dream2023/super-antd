import { ProFormDatePicker } from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import type { DatePickerProps } from 'antd/lib/date-picker';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperQuarterProps = CreateSuperFormItemProps<ProFormItemProps<DatePickerProps>>;
export const SuperQuarter = createSuperFormItem<ProFormItemProps<DatePickerProps>>(ProFormDatePicker.Quarter, {
  placeholderPrefix: '请选择',
});
SuperQuarter.displayName = 'SuperQuarter';

export default SuperQuarter;
