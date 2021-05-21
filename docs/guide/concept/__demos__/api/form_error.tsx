import React from 'react';

import { SuperForm, SuperInput, SuperPassword, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

const App = () => {
  return (
    // 1.配置 axios
    <SuperProvider axios={axiosInstance}>
      {/* 2.使用 */}
      <SuperForm
        align="center"
        hideLabel
        size="large"
        style={{ width: 330 }}
        api={{ url: '/login/error', method: 'POST' }}
        btns={{ resetBtn: false, submitBtn: { text: '登录', style: { width: 330 } } }}
      >
        <SuperInput name="name" label="姓名"></SuperInput>
        <SuperPassword name="password" label="密码"></SuperPassword>
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
