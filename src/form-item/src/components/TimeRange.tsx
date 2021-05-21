import { ProFormTimePicker } from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import type { DatePickerProps } from 'antd';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperTimeRangeProps = CreateSuperFormItemProps<ProFormItemProps<DatePickerProps>>;
export const SuperTimeRange = createSuperFormItem<ProFormItemProps<DatePickerProps>>(ProFormTimePicker.RangePicker, {
  placeholderPrefix: '请选择',
});
SuperTimeRange.displayName = 'SuperTimeRange';

export default SuperTimeRange;
