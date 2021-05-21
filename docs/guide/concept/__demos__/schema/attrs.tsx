import React from 'react';

import { SuperForm, SuperInput, SuperNumber, SuperProvider, SuperRender } from 'super-antd';

const components = {
  form: SuperForm,
  input: SuperInput,
  number: SuperNumber,
};

const App = () => {
  const schema = {
    component: 'form',
    initialValues: { remember: true },
    size: 'large',
    children: [
      {
        component: 'input',
        name: 'name',
        label: '姓名',
      },
      {
        component: 'number',
        name: 'age',
        label: '年龄',
      },
      {
        component: 'number',
        name: 'money',
        label: '收入',
      },
    ],
  };

  // 组件默认属性
  const componentProps = {
    numer: {
      min: 0,
    },
  };

  return (
    <SuperProvider components={components} componentProps={componentProps}>
      <SuperRender schema={schema}></SuperRender>
    </SuperProvider>
  );
};

export default App;
