import React from 'react';

import { SuperTpl } from 'super-antd';

const App = () => {
  const data = {
    startTime: new Date(),
  };
  return <SuperTpl value={'开始时间为：{{data.startTime | date }}'} data={data}></SuperTpl>;
};

export default App;
