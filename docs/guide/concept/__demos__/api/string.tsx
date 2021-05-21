import React from 'react';

import { SuperForm, SuperInput, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

const App = () => {
  return (
    // 1.配置 axios
    <SuperProvider axios={axiosInstance}>
      {/* 2.使用 */}
      <SuperForm initApi="/user/1">
        <SuperInput name="name" label="姓名"></SuperInput>
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
