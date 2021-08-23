import type { FC } from 'react';
import React from 'react';
import ReactWEditor from 'wangeditor-for-react';
import type { ReactWEProps } from 'wangeditor-for-react/lib/type';

export type AntdEditorProps = ReactWEProps;

export const AntdEditor: FC<AntdEditorProps> = (props) => {
  return <ReactWEditor {...props} />;
};
