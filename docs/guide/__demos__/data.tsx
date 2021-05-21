import React from 'react';

import { SuperCheckbox, SuperForm, SuperInput, SuperProvider, SuperRender } from 'super-antd';

import axiosInstance from './axios-instance';

const components = {
  form: SuperForm,
  input: SuperInput,
  checkbox: SuperCheckbox,
};

const App = () => {
  const schema = {
    component: 'form',
    initApi: {
      url: '/user/1',
      response: {
        name: '{{data.first_name}}-{{data.last_name}}',
        id: '{{data.id}}',
      },
    },
    api: {
      url: '/user/1',
      method: 'PUT',
    },
    redirect: 'https://bilibili.com',
    children: [
      {
        component: 'input',
        name: 'name',
        label: '姓名',
      },
      {
        component: 'checkbox',
        name: 'cat',
        label: '是否有猫',
      },
      {
        component: 'input',
        name: 'cat_name',
        label: '猫的名字',
        visibleOn: (data: any) => data.cat,
        linkageFields: ['cat'],
        clearValueAfterHidden: true,
      },
    ],
  };

  return (
    <SuperProvider axios={axiosInstance} components={components}>
      <SuperRender schema={schema}></SuperRender>
    </SuperProvider>
  );
};

export default App;
