import './code-editor.css';

import ProField from '@ant-design/pro-field';
import type { ProFormItemProps } from '@ant-design/pro-form';
import createField from '@ant-design/pro-form/es/BaseForm/createField';
import type { TextareaCodeEditorProps } from '@uiw/react-textarea-code-editor';
import CodeEditor from '@uiw/react-textarea-code-editor';
import classnames from 'classnames';
import React from 'react';

export type ProFormCodeEditorProps = ProFormItemProps<Omit<TextareaCodeEditorProps, 'readOnly'>> & {
  language?: TextareaCodeEditorProps['language'];
  padding?: TextareaCodeEditorProps['padding'];
  minHeight?: TextareaCodeEditorProps['minHeight'];
};

const ProFormCodeEditor = ({
  fieldProps,
  proFieldProps,
  className,
  name,
  placeholder,
  ...otherProps
}: ProFormCodeEditorProps) => (
  <ProField
    mode="edit"
    valueType="text"
    fieldProps={fieldProps}
    render={(text) => {
      return (
        <CodeEditor
          value={text}
          placeholder={placeholder ? String(placeholder) : undefined}
          readOnly
          className={classnames('super-code-editor', className)}
          {...otherProps}
        ></CodeEditor>
      );
    }}
    renderFormItem={(text) => {
      return (
        <CodeEditor
          value={text}
          minHeight={30}
          placeholder={placeholder ? String(placeholder) : undefined}
          className={classnames('ant-input', 'super-code-editor', className)}
          {...otherProps}
        ></CodeEditor>
      );
    }}
    {...proFieldProps}
  />
);

export default createField<ProFormCodeEditorProps>(ProFormCodeEditor);
