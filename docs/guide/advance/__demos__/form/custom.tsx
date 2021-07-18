import React from 'react';

import { SuperForm, SuperInput } from 'super-antd';

import SuperQuill from './super-quill';

const App = () => {
  return (
    <SuperForm debug>
      <SuperInput name="name" label="姓名" />
      {/* 我们可以通过 fieldProps 设置原始属性，也就是 ReactQuillProps 的属性 */}
      <SuperQuill name="description" label="介绍" fieldProps={{ preserveWhitespace: true }} />
    </SuperForm>
  );
};

export default App;
