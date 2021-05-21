import React from 'react';

import { SuperForm, SuperInput, SuperProvider, SuperRender } from 'super-antd';

import axiosInstance from './axios-instance';

const components = {
  form: SuperForm,
  input: SuperInput,
};

const Demo = () => {
  // schema 需要存储
  const schema = {
    component: 'form',
    // 行为1、远程获取数据，直接通过 api 数据就可以办到
    api: { url: '/user/1', method: 'PUT' },
    // 行为2、跳转，通过 redirect 就可以办到
    redirect: 'https://bilibili.com',
    children: {
      component: 'input',
      name: 'username',
      label: '姓名',
    },
  };

  return (
    <SuperProvider components={components} axios={axiosInstance}>
      <SuperRender schema={schema}></SuperRender>
    </SuperProvider>
  );
};

export default Demo;
