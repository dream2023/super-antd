import { ProFormTimePicker } from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import type { DatePickerProps } from 'antd';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperTimeProps = CreateSuperFormItemProps<ProFormItemProps<DatePickerProps>>;
export const SuperTime = createSuperFormItem<ProFormItemProps<DatePickerProps>>(ProFormTimePicker, {
  placeholderPrefix: '请选择',
});
SuperTime.displayName = 'SuperTime';

export default SuperTime;
