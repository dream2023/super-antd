import React from 'react';

import { SuperChainSelect, SuperForm, SuperInput, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

const App = () => {
  return (
    <SuperProvider axios={axiosInstance}>
      <SuperForm
        debug
        initialValues={{
          name: 'jack',
          city: [1000, 1001, 1011],
        }}
      >
        <SuperInput name="name" label="姓名" />
        <SuperChainSelect
          name="city"
          readonly
          label="请选择城市"
          options="/address"
          optionsProp={{ labelKey: 'name', valueKey: 'code' }}
        />
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
