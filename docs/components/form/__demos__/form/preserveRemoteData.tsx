import React from 'react';

import { SuperForm, SuperInput, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

const Demo = () => {
  return (
    <SuperProvider axios={axiosInstance}>
      <SuperForm
        preserveRemoteData
        api={{ url: '/user/1', method: 'POST' }}
        initApi="/user/1"
        btns={{ submitBtn: '使用 network 看看请求参数' }}
      >
        <SuperInput name="name" label="姓名"></SuperInput>
      </SuperForm>
    </SuperProvider>
  );
};

export default Demo;
