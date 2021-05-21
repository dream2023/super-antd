import React from 'react';

import { SuperTpl } from 'super-antd';

const App = () => {
  return (
    <SuperTpl
      value="{{data.message.split('').reverse().join('')}}"
      data={{
        message: 'are you ok?',
      }}
    ></SuperTpl>
  );
};

export default App;
