import { ProFormDigit } from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import type { InputNumberProps } from 'antd/lib/input-number';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

type ProFormDigitProps = ProFormItemProps<InputNumberProps> & {
  min?: InputNumberProps['min'];
  max?: InputNumberProps['max'];
};

export type SuperNumberProps = CreateSuperFormItemProps<ProFormDigitProps>;
export const SuperNumber = createSuperFormItem<ProFormDigitProps>(ProFormDigit);
SuperNumber.displayName = 'SuperNumber';

export default SuperNumber;
