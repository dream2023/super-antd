import { message } from 'antd';
import React from 'react';

import { ErrorNotifyType, SuccessNotifyType, SuperForm, SuperInput, SuperProvider } from 'super-antd';

// 0. axios 是必须的
import axiosInstance from './axios-instance';

// 1.定义请求成功处理函数
const successNotify: SuccessNotifyType = (msg?: string) => {
  if (msg) {
    message.success(msg);
  }
};

// 2.定义请求失败处理函数
const errorNotify: ErrorNotifyType = (msg?: string, error?: Error) => {
  message.error(msg || error?.message);
};

const App = () => {
  return (
    // 1.配置 axios
    <SuperProvider axios={axiosInstance} successNotify={successNotify} errorNotify={errorNotify}>
      {/* 2.使用 */}
      <SuperForm api={{ url: '/user/1', method: 'POST' }}>
        <SuperInput name="name" label="姓名"></SuperInput>
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
