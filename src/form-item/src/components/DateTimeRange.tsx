import { ProFormDateRangePicker } from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import type { RangePickerProps } from 'antd/lib/date-picker/generatePicker';
import type { Mockjs } from 'mockjs';
import type { Moment } from 'moment';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperDateTimeRangeProps = CreateSuperFormItemProps<ProFormItemProps<RangePickerProps<Moment>>>;
export const SuperDateTimeRange = createSuperFormItem<ProFormItemProps<RangePickerProps<Moment>>>(
  ProFormDateRangePicker,
  {
    placeholderPrefix: '请选择',
    defaultMockRule: () => {
      return (Mock: Mockjs) => [
        Number(new Date()) - Mock.Random.integer(0, 10000),
        Number(new Date()) + Mock.Random.integer(0, 10000),
      ];
    },
  },
);
SuperDateTimeRange.displayName = 'SuperDateTimeRange';

export default SuperDateTimeRange;
