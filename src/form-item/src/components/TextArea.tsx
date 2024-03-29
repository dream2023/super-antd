import type { ProFormItemProps } from '@ant-design/pro-form';
import { ProFormTextArea } from '@ant-design/pro-form';
import type { TextAreaProps } from 'antd/lib/input/TextArea';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperTextAreaProps = CreateSuperFormItemProps<ProFormItemProps<TextAreaProps>>;
export const SuperTextArea = createSuperFormItem<ProFormItemProps<TextAreaProps>>(ProFormTextArea, {
  placeholderPrefix: '请输入',
});
SuperTextArea.displayName = 'SuperTextArea';

export default SuperTextArea;
