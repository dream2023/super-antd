import { ProFormDigit } from '@ant-design/pro-form';
import type { ProFormDigitProps } from '@ant-design/pro-form/lib/components/Digit';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperNumberProps = CreateSuperFormItemProps<ProFormDigitProps>;
export const SuperNumber = createSuperFormItem<ProFormDigitProps>(ProFormDigit);
SuperNumber.displayName = 'SuperNumber';

export default SuperNumber;
