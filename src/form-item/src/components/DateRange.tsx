import { ProFormDateRangePicker } from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import type { RangePickerProps } from 'antd/lib/date-picker';
import type { Mockjs } from 'mockjs';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperDateRangeProps = CreateSuperFormItemProps<ProFormItemProps<RangePickerProps>>;
export const SuperDateRange = createSuperFormItem<ProFormItemProps<RangePickerProps>>(ProFormDateRangePicker, {
  placeholderPrefix: '请选择',
  defaultMockRule: () => {
    return (Mock: Mockjs) => [
      Number(new Date()) - Mock.Random.integer(0, 10000),
      Number(new Date()) + Mock.Random.integer(0, 10000),
    ];
  },
});
SuperDateRange.displayName = 'SuperDateRange';

export default SuperDateRange;
