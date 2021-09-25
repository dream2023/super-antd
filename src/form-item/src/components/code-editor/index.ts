import type { FC } from 'react';

import type { CreateSuperFormItemProps } from '../../createSuperFormItem';
import { createSuperFormItem } from '../../createSuperFormItem';
import type { ProFormCodeEditorProps } from './ProFormCodeEditor';
import ProFormCodeEditor from './ProFormCodeEditor';

export type SuperCodeEditorProps = CreateSuperFormItemProps<ProFormCodeEditorProps>;
export const SuperCodeEditor: FC<SuperCodeEditorProps> = createSuperFormItem(ProFormCodeEditor);
SuperCodeEditor.displayName = 'SuperCodeEditor';

export default ProFormCodeEditor;
