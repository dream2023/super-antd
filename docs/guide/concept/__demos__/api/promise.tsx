import React from 'react';

import { SuperForm, SuperInput, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

// 获取用户
export const getUser = (id: number) => {
  return axiosInstance({ method: 'GET', url: `/user/${id}` });
};

const App = () => {
  return (
    // 1.配置 axios
    <SuperProvider axios={axiosInstance}>
      {/* 2.使用 */}
      <SuperForm initApi={() => getUser(1)}>
        <SuperInput name="name" label="姓名"></SuperInput>
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
