import ProField from '@ant-design/pro-field';
import createField from '@ant-design/pro-form/es/BaseForm/createField';
import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import React from 'react';
import xss from 'xss';

import type { AntdEditorProps } from './AntdEditor';
import { AntdEditor } from './AntdEditor';

export type ProFormEditorProps = ProFormItemProps<AntdEditorProps> & {
  config?: Partial<AntdEditorProps['config']>;
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
        <AntdEditor
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
