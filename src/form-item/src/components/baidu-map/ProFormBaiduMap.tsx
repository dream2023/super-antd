import ProField from '@ant-design/pro-field';
import type { ProFormItemProps } from '@ant-design/pro-form';
import createField from '@ant-design/pro-form/es/BaseForm/createField';
import React from 'react';

import type { BaiduMapProps } from './BaiduMap';
import { BaiduMap } from './BaiduMap';

export type ProFormBaiduMapProps = Omit<ProFormItemProps<Omit<BaiduMapProps, 'ak'>>, 'placeholder'> & {
  ak?: BaiduMapProps['ak'];
  placeholder?: BaiduMapProps['ak'];
};
const ProFormBaiduMap = ({ fieldProps, proFieldProps, placeholder, ak }: ProFormBaiduMapProps) => (
  <ProField
    mode="edit"
    valueType="text"
    fieldProps={fieldProps}
    render={(value) => {
      return <div style={{ marginTop: 5 }}>{value.address || '-'}</div>;
    }}
    renderFormItem={(value, props) => {
      const { placeholder: _, ...otherProps } = props;
      return <BaiduMap value={value} ak={ak} placeholder={placeholder} {...otherProps} />;
    }}
    {...proFieldProps}
  />
);

export default createField<ProFormBaiduMapProps>(ProFormBaiduMap);
