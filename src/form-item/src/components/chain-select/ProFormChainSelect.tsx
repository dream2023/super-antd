import ProField from '@ant-design/pro-field';
import type { ProFormItemProps } from '@ant-design/pro-form';
import createField from '@ant-design/pro-form/es/BaseForm/createField';
import React from 'react';

import type { ChainSelectProps } from './ChainSelect';
import { ChainSelect } from './ChainSelect';

export type ProFormChainSelectProps = ProFormItemProps<ChainSelectProps> & {
  options: ChainSelectProps['options'];
  optionsProp?: ChainSelectProps['optionsProp'];
};

export const ProFormChainSelect = ({ fieldProps, proFieldProps, options, optionsProp }: ProFormChainSelectProps) => (
  <ProField
    mode="edit"
    fieldProps={fieldProps}
    render={(val, { placeholder, ...otherProps }) => {
      return <ChainSelect {...otherProps} options={options} mode="read" optionsProp={optionsProp} />;
    }}
    renderFormItem={(text, { placeholder, ...otherProps }) => {
      return <ChainSelect {...otherProps} options={options} optionsProp={optionsProp} />;
    }}
    {...proFieldProps}
  />
);

export default createField<ProFormChainSelectProps>(ProFormChainSelect);
