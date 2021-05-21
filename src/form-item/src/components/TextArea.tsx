import { ProFormTextArea } from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import type { TextAreaProps } from 'antd/lib/input/TextArea';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperTextAreaProps = CreateSuperFormItemProps<ProFormItemProps<TextAreaProps>>;
export const SuperTextArea = createSuperFormItem<ProFormItemProps<TextAreaProps>>(ProFormTextArea, {
  placeholderPrefix: '请输入',
  defaultMockRule: '@sentence',
});
SuperTextArea.displayName = 'SuperTextArea';

export default SuperTextArea;
