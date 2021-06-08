import React from 'react';

import { SuperEmail, SuperForm, SuperInput, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

const Demo = () => {
  return (
    <SuperProvider axios={axiosInstance}>
      <SuperForm
        initApi={{
          url: '/user/1',
          response: {
            username: '{{data.first_name}}-{{data.last_name}}',
            email: '{{data.email}}',
          },
        }}
      >
        <SuperInput name="username" label="姓名"></SuperInput>
        <SuperEmail name="email" label="邮箱"></SuperEmail>
      </SuperForm>
    </SuperProvider>
  );
};

export default Demo;
