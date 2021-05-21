import { AudioOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';

import { SuperCheckbox, SuperEmail, SuperForm, SuperInput, SuperProvider, SuperRender } from 'super-antd';

import axiosInstance from './axios-instance';

// 1.提前设置好映射
const components = {
  form: SuperForm,
  input: SuperInput,
  email: SuperEmail,
  checkbox: SuperCheckbox,
  'icon-UserOutlined': UserOutlined,
  'icon-AudioOutlined': AudioOutlined,
};

export default () => {
  // 2.传递配置
  return (
    <SuperProvider axios={axiosInstance} components={components}>
      {/* 3.渲染 */}
      <SuperRender
        schema={{
          component: 'div',
          style: { margin: '20px' },
          schemaApi: '/form', // 通过 schemaApi 获取远程内容
        }}
      ></SuperRender>
    </SuperProvider>
  );
};
