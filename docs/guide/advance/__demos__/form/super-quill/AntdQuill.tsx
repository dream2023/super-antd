import 'react-quill/dist/quill.snow.css';
import './super-quill.css';

import React from 'react';
import type { FC } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';

// 如果需要处理自己的逻辑
export type AntdQuillProps = ReactQuillProps;

const AntdQuill: FC<AntdQuillProps> = ({ value, onChange, ...props }) => {
  // 如果需要加自己的逻辑，就这里加就好了
  return <ReactQuill theme="snow" value={value} onChange={onChange} {...props} />;
};

export default AntdQuill;
