import type { CreateSuperFormItemProps } from '../../createSuperFormItem';
import { createSuperFormItem } from '../../createSuperFormItem';
import type { ProFormChainSelectProps } from './ProFormChainSelect';
import ProFormChainSelect from './ProFormChainSelect';

export type SuperChainSelectProps = CreateSuperFormItemProps<ProFormChainSelectProps>;
export const SuperChainSelect = createSuperFormItem<ProFormChainSelectProps>(ProFormChainSelect, {
  placeholderPrefix: '请选择',
});

SuperChainSelect.displayName = 'SuperChainSelect';
export default SuperChainSelect;
