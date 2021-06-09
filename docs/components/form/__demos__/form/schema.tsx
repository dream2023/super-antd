import React from 'react';

import { SchemaRender, SuperCheckbox, SuperEmail, SuperForm, SuperInput, SuperProvider } from 'super-antd';

const components = {
  form: SuperForm,
  input: SuperInput,
  email: SuperEmail,
  checkbox: SuperCheckbox,
};

const Demo = () => {
  const schema = {
    component: 'form',
    children: [
      {
        component: 'input',
        name: 'name',
        label: '姓名',
        key: 'name',
      },
      {
        component: 'email',
        name: 'email',
        label: '邮箱',
        key: 'email',
      },
      {
        component: 'checkbox',
        name: 'remember',
        text: 'Remember me',
        key: 'remember',
      },
    ],
  };
  return (
    <SuperProvider components={components}>
      <SchemaRender schema={schema}></SchemaRender>
    </SuperProvider>
  );
};

export default Demo;
