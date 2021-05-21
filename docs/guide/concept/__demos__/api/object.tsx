import React from 'react';

import { SuperForm, SuperInput, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

const App = () => {
  return (
    <SuperProvider axios={axiosInstance}>
      {/* initApi 为对象，同 axios 请求配置 */}
      <SuperForm
        initApi={{
          url: '/user/1',
          method: 'GET',
          params: {
            foo: 'bar',
          },
        }}
      >
        <SuperInput name="name" label="姓名"></SuperInput>
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
