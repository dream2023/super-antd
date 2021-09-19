import type { ProFormItemProps } from '@ant-design/pro-form';
import { ProFormRate } from '@ant-design/pro-form';
import type { RateProps } from 'antd/lib/rate';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperRateProps = CreateSuperFormItemProps<ProFormItemProps<RateProps>>;
export const SuperRate = createSuperFormItem<ProFormItemProps<RateProps>>(ProFormRate);
SuperRate.displayName = 'SuperRate';

export default SuperRate;
