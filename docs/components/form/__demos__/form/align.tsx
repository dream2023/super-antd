import React from 'react';

import { SuperForm, SuperInput, SuperPassword, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

const App = () => {
  return (
    <SuperProvider axios={axiosInstance}>
      {/* align="center" */}
      <SuperForm
        align="center"
        hideLabel
        size="large"
        style={{ width: 330 }}
        btns={{ resetBtn: false, submitBtn: { text: '登录', style: { width: 330 } } }}
      >
        <SuperInput name="name" label="姓名"></SuperInput>
        <SuperPassword name="password" label="密码"></SuperPassword>
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
