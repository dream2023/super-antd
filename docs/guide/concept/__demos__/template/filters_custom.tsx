import React from 'react';

import { SuperProvider, SuperTpl } from 'super-antd';

// 1、定义函数
const toUpperCase = (value?: unknown) => {
  if (typeof value === 'string') return value.toUpperCase();
  return value;
};
const toLowerCase = (value?: unknown) => {
  if (typeof value === 'string') return value.toLowerCase();
  return value;
};

// 2.定义 filters 对象
const filters = {
  toUpperCase,
  toLowerCase,
};

const App = () => {
  const data = {
    name: 'jack',
  };
  return (
    // 3.传递配置
    <SuperProvider filters={filters}>
      {/* 4. 应用转 */}
      <SuperTpl value={'hello：{{data.name | toUpperCase}}'} data={data}></SuperTpl>
    </SuperProvider>
  );
};

export default App;
