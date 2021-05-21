import { ProFormCheckbox } from '@ant-design/pro-form';
import type { ProFormCheckboxProps } from '@ant-design/pro-form/lib/components/Checkbox';
import type { FC } from 'react';
import React from 'react';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export interface BasicSuperCheckboxProps extends ProFormCheckboxProps {
  text?: string;
}

// 支持 text 形式的 children
const BasicSuperCheckbox: FC<BasicSuperCheckboxProps> = ({ text, label, children, ...resetProps }) => {
  return (
    <ProFormCheckbox {...resetProps} label={label === undefined ? '' : label}>
      {text || children}
    </ProFormCheckbox>
  );
};

export type SuperCheckboxProps = CreateSuperFormItemProps<BasicSuperCheckboxProps>;
export const SuperCheckbox = createSuperFormItem<BasicSuperCheckboxProps>(BasicSuperCheckbox, {
  defaultMockRule: '@boolean',
});

SuperCheckbox.displayName = 'SuperCheckbox';

export default SuperCheckbox;
