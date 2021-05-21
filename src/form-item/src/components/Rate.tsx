import { ProFormRate } from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import type { RateProps } from 'antd/lib/rate';
import type { Mockjs } from 'mockjs';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperRateProps = CreateSuperFormItemProps<ProFormItemProps<RateProps>>;
export const SuperRate = createSuperFormItem<ProFormItemProps<RateProps>>(ProFormRate, {
  defaultMockRule: (props: ProFormItemProps<RateProps>) => {
    return (Mock: Mockjs) => Mock.Random.integer(0, props.fieldProps?.count || 5);
  },
});
SuperRate.displayName = 'SuperRate';

export default SuperRate;
