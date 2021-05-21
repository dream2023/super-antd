import React from 'react';

import { SuperForm, SuperInput, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

const App = () => {
  return (
    <SuperProvider axios={axiosInstance}>
      <SuperForm
        api={{
          url: '/user/1',
          method: 'POST',
          data: {
            // 将两个字段合并为了一个字段
            address: '{{data.province}}-{{data.city}}',
          },
        }}
      >
        <SuperInput name="province" label="省份"></SuperInput>
        <SuperInput name="city" label="城市"></SuperInput>
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
