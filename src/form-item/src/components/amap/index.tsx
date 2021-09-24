import type { FC } from 'react';

import type { CreateSuperFormItemProps } from '../../createSuperFormItem';
import { createSuperFormItem } from '../../createSuperFormItem';
import type { ProFormAmapProps } from './ProFormAmap';
import ProFormAmap from './ProFormAmap';

export type SuperAmapProps = CreateSuperFormItemProps<ProFormAmapProps>;
export const SuperAmap: FC<SuperAmapProps> = createSuperFormItem(ProFormAmap, {
  placeholderPrefix: '请选择',
});
SuperAmap.displayName = 'SuperAmap';

export default SuperAmap;
