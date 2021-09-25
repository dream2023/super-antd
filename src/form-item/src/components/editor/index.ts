import type { FC } from 'react';

import type { CreateSuperFormItemProps } from '../../createSuperFormItem';
import { createSuperFormItem } from '../../createSuperFormItem';
import type { ProFormEditorProps } from './ProFormEditor';
import ProFormEditor from './ProFormEditor';

export type SuperEditorProps = CreateSuperFormItemProps<ProFormEditorProps>;
export const SuperEditor: FC<SuperEditorProps> = createSuperFormItem(ProFormEditor);
SuperEditor.displayName = 'SuperEditor';

export default ProFormEditor;
