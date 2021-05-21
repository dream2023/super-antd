import React from 'react';

import { SuperRender } from 'super-antd';

const App = () => {
  const schema = {
    component: 'div',
    // className 为数组
    className: ['ant-card', 'ant-card-bordered', 'ant-card-hoverable'],
    style: {
      height: '300px',
      lineHeight: '300px',
      fontSize: '50px',
      textAlign: 'center',
    },
    children: '本来无一物，何处惹尘埃。',
  };
  return <SuperRender schema={schema}></SuperRender>;
};

export default App;
