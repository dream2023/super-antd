import type { FC } from 'react';

import type { CreateSuperFormItemProps } from '../../createSuperFormItem';
import { createSuperFormItem } from '../../createSuperFormItem';
import type { ProFormEditorProps } from './ProEditor';
import ProFormEditor from './ProEditor';

export type SuperEditorProps = CreateSuperFormItemProps<ProFormEditorProps>;
export const SuperEditor: FC<SuperEditorProps> = createSuperFormItem(ProFormEditor);
SuperEditor.displayName = 'SuperEditor';

export default ProFormEditor;
