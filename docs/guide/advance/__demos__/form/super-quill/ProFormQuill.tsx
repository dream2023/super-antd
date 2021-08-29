import ProField from '@ant-design/pro-field';
import type { ProFormItemProps } from '@ant-design/pro-form';
import createField from '@ant-design/pro-form/es/BaseForm/createField';
import React from 'react';
import xss from 'xss';

import AntdQuill, { AntdQuillProps } from './AntdQuill';

// 类型
export type ProFormQuillProps = ProFormItemProps<AntdQuillProps>;

const ProFormQuill = ({ fieldProps, proFieldProps }: ProFormQuillProps) => (
  <ProField
    mode="edit"
    valueType="text"
    fieldProps={fieldProps}
    render={(text) => {
      return <div style={{ marginTop: 5 }} dangerouslySetInnerHTML={{ __html: xss(text) }}></div>;
    }}
    renderFormItem={(text, props) => {
      const { placeholder, ...otherProps } = props;
      return (
        <AntdQuill
          value={text}
          placeholder={Array.isArray(placeholder) ? placeholder.join(',') : placeholder}
          {...otherProps}
        />
      );
    }}
    {...proFieldProps}
  />
);

export default createField<ProFormQuillProps>(ProFormQuill);
