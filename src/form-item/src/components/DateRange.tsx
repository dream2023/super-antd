import { ProFormDateRangePicker } from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form';
import type { RangePickerProps } from 'antd/lib/date-picker';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperDateRangeProps = CreateSuperFormItemProps<ProFormItemProps<RangePickerProps>>;
export const SuperDateRange = createSuperFormItem<ProFormItemProps<RangePickerProps>>(ProFormDateRangePicker, {
  placeholderPrefix: '请选择',
});
SuperDateRange.displayName = 'SuperDateRange';

export default SuperDateRange;
