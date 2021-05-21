import React from 'react';

import { SuperTpl } from 'super-antd';

const App = () => {
  return (
    // 先转为整数、再转为千分位价格
    <SuperTpl
      value="{{data.total | toInt | toPrice}}"
      data={{
        total: 23500.33,
      }}
    ></SuperTpl>
  );
};

export default App;
