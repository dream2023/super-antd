import React from 'react';

import { SuperEditor, SuperEditorProps, SuperForm, SuperInput, withDefaultProps } from 'super-antd';

const MyEditor = withDefaultProps<SuperEditorProps>(SuperEditor, {
  // 更多配置项参考：https://www.wangeditor.com/doc/pages/03-%E9%85%8D%E7%BD%AE%E8%8F%9C%E5%8D%95/01-%E8%87%AA%E5%AE%9A%E4%B9%89%E8%8F%9C%E5%8D%95.html
  config: {
    menus: ['bold', 'head', 'link', 'italic', 'foreColor', 'underline'],
    colors: ['#000000', '#eeece0', '#1c487f', '#4d80bf'],
  },
});

const App = () => {
  return (
    <SuperForm debug>
      <SuperInput name="name" label="姓名" />
      <MyEditor name="description" label="介绍" />
    </SuperForm>
  );
};

export default App;
