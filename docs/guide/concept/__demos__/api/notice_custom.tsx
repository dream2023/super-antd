import React from 'react';

import { SuperForm, SuperInput, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

const App = () => {
  return (
    <SuperProvider axios={axiosInstance}>
      <SuperForm
        api={{
          url: 'https://error.com',
          method: 'PUT',
        }}
        message={{
          saveError: '请求地址错误了~',
        }}
      >
        <SuperInput name="province" label="省份"></SuperInput>
        <SuperInput name="city" label="城市"></SuperInput>
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
