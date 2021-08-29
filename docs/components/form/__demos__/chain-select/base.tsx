import React from 'react';

import { SuperChainSelect, SuperForm, SuperInput, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

const App = () => {
  return (
    <SuperProvider axios={axiosInstance}>
      <SuperForm debug>
        <SuperInput name="name" label="姓名" />
        <SuperChainSelect
          name="city"
          label="请选择城市"
          options="/address"
          optionsProp={{ labelKey: 'name', valueKey: 'code' }}
        />
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
