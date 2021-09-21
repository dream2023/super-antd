import ProField from '@ant-design/pro-field';
import type { ProFormItemProps } from '@ant-design/pro-form';
import createField from '@ant-design/pro-form/es/BaseForm/createField';
import React from 'react';

import type { AmapProps } from './Amap';
import { Amap } from './Amap';

export type ProFormAmapProps = Omit<ProFormItemProps<Omit<AmapProps, 'ak'>>, 'placeholder'> & {
  ak?: AmapProps['ak'];
  placeholder?: AmapProps['ak'];
};
const ProFormBaiduMap = ({ fieldProps, proFieldProps, placeholder, ak }: ProFormAmapProps) => (
  <ProField
    mode="edit"
    valueType="text"
    fieldProps={fieldProps}
    render={(value) => {
      return <div style={{ marginTop: 5 }}>{value.address || '-'}</div>;
    }}
    renderFormItem={(value, props) => {
      const { placeholder: _, ...otherProps } = props;
      return <Amap value={value} ak={ak} placeholder={placeholder} {...otherProps} />;
    }}
    {...proFieldProps}
  />
);

export default createField<ProFormAmapProps>(ProFormBaiduMap);
