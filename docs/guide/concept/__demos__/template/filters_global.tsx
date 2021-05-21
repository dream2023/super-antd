import React from 'react';

import { SuperTpl } from 'super-antd';

const App = () => {
  return (
    <pre>
      <div>通过表达式使用全局函数：</div>
      <SuperTpl
        value={'{{JSON.stringify(data.info, null, 2)}}'}
        data={{
          info: { name: 'jack', age: 18 },
        }}
      ></SuperTpl>

      <div>通过过滤器使用全局函数：</div>
      <SuperTpl
        value={'{{data.info | JSON.stringify(null, 2)}}'}
        data={{
          info: { name: 'jack', age: 18 },
        }}
      ></SuperTpl>
    </pre>
  );
};

export default App;
