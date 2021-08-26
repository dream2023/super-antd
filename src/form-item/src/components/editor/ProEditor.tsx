import ProField from '@ant-design/pro-field';
import createField from '@ant-design/pro-form/es/BaseForm/createField';
import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import React from 'react';
import ReactWEditor from 'wangeditor-for-react';
import type { ReactWEProps } from 'wangeditor-for-react/lib/type';
import xss from 'xss';

export type ProFormEditorProps = ProFormItemProps<ReactWEProps> & {
  config?: Partial<ReactWEProps['config']>;
};

const ProFormEditor = ({ fieldProps, proFieldProps, config }: ProFormEditorProps) => (
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
        <ReactWEditor
          value={text}
          config={config}
          placeholder={Array.isArray(placeholder) ? placeholder.join(',') : placeholder}
          {...otherProps}
        />
      );
    }}
    {...proFieldProps}
  />
);

export default createField<ProFormEditorProps>(ProFormEditor);
