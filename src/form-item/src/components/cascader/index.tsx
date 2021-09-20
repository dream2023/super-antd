import type { CreateSuperFormItemWithOptionsProps } from '../../createSuperFormItem';
import { createSuperFormItemWithOptions } from '../../createSuperFormItem';
import type { ProFormCascaderProps } from './ProFormCascader';
import ProFormCascader from './ProFormCascader';

export type SuperCascaderProps = CreateSuperFormItemWithOptionsProps<ProFormCascaderProps>;
export const SuperCascader = createSuperFormItemWithOptions<ProFormCascaderProps>(ProFormCascader, {
  placeholderPrefix: '请选择',
});

SuperCascader.displayName = 'SuperCascader';
export default SuperCascader;
