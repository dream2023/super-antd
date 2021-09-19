import { ProFormRadio } from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form';
import type { RadioProps } from 'antd/lib/radio/interface';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperRadioProps = CreateSuperFormItemProps<ProFormItemProps<RadioProps>>;
export const SuperRadio = createSuperFormItem<ProFormItemProps<RadioProps>>(ProFormRadio, {});
SuperRadio.displayName = 'SuperRadio';

export default SuperRadio;
