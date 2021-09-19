import ProField from '@ant-design/pro-field';
import type { ProFormItemProps } from '@ant-design/pro-form';
import createField from '@ant-design/pro-form/es/BaseForm/createField';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';
import React from 'react';
import { findLabelByValue } from './util';


export type ProFormCascaderProps = ProFormItemProps<CascaderProps> & {
  options?: CascaderProps['options']
}

export const ProFormCascader = ({ fieldProps, proFieldProps, options }: ProFormCascaderProps) => (
  <ProField
    mode="edit"
    valueType='select'
    fieldProps={fieldProps}
    render={(val) => {
      let res = val
      if (Array.isArray(res)) {
        res = findLabelByValue(options || [], res).join('，')
      }
      return <div>{String(res)}</div>
    }}
    renderFormItem={(text, props) => {
      const { placeholder, ...otherProps } = props;
      return (
        <Cascader placeholder={String(placeholder)} {...otherProps} options={options} />
      );
    }}
    {...proFieldProps}
  />
);

export default createField<ProFormCascaderProps>(ProFormCascader);
