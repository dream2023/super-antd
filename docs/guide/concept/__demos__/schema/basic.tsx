import { AudioOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';

import { SuperCheckbox, SuperEmail, SuperForm, SuperInput, SuperProvider, SuperRender } from 'super-antd';

// 1、建立映射关系
const components = {
  form: SuperForm,
  input: SuperInput,
  email: SuperEmail,
  checkbox: SuperCheckbox,
  'icon-UserOutlined': UserOutlined,
  'icon-AudioOutlined': AudioOutlined,
};

const App = () => {
  // 2、定义 schema 对象
  const schema = {
    component: 'form',
    initialValues: { remember: true },
    size: 'large',
    children: [
      {
        component: 'input',
        name: 'name',
        label: '姓名',
        prefix: {
          component: 'icon-UserOutlined',
        },
        suffix: {
          component: 'icon-AudioOutlined',
        },
      },
      {
        component: 'email',
        name: 'email',
        label: '邮箱',
      },
      {
        component: 'checkbox',
        name: 'remember',
        text: 'remember me',
      },
    ],
  };

  // 3、传递 components 映射关系
  return (
    <SuperProvider components={components}>
      {/* 4.渲染 */}
      <SuperRender schema={schema}></SuperRender>
    </SuperProvider>
  );
};

export default App;
