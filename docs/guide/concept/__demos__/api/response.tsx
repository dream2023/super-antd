import React from 'react';

import { SuperForm, SuperInput, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

const App = () => {
  return (
    <SuperProvider axios={axiosInstance}>
      <SuperForm
        initApi={{
          url: '/user/1',
          method: 'GET',
          // response 把两个字段合并为了一个字段
          response: {
            address: '{{data.province}}-{{data.city}}',
          },
        }}
      >
        <SuperInput name="address" label="地区"></SuperInput>
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
