import React from 'react';

import { SuperForm, SuperProvider, SuperSelect } from 'super-antd';

import axiosInstance from './axios-instance';

interface OptionItem {
  id: number;
  name: string;
}

const App = () => {
  return (
    // 1.配置 axios
    <SuperProvider axios={axiosInstance}>
      {/* 2.使用 */}
      <SuperForm>
        <SuperSelect
          name="type"
          label="选项"
          options={async () => {
            // 发起请求
            const data = await axiosInstance.get<any, { list: OptionItem[] }>('/options/a');
            // 数据转换
            return data.list.map((item) => ({ label: item.name, value: item.id }));
          }}
        ></SuperSelect>
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
