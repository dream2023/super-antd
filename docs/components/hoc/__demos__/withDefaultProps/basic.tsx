import { Button, ButtonProps } from 'antd';
import React from 'react';

import { withDefaultProps } from 'super-antd';

const MyButton = withDefaultProps<ButtonProps>(Button, { type: 'primary' }); // 拥有了  `type` 默认值

const App = () => {
  // 此时应该显示 primary 主题色
  return <MyButton>hello world</MyButton>;
};

export default App;
