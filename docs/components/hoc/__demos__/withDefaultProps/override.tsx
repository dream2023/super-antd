import { Button, ButtonProps } from 'antd';
/** Title: 覆盖属性 desc: 我们可以对默认属性做覆盖 */
import React from 'react';

import { withDefaultProps } from 'super-antd';

const MyButton = withDefaultProps<ButtonProps>(Button, { type: 'primary' }); // 拥有了  `type` 默认值

const App = () => {
  return <MyButton type="dashed">hello world</MyButton>;
};

export default App;
