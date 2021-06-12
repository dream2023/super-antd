import React from 'react';

import { SuperEmail, SuperForm, SuperInput, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

const Demo = () => {
  return (
    <SuperProvider axios={axiosInstance}>
      <SuperForm
        api={{
          url: '/user/1',
          method: 'PUT',
          data: {
            info: {
              userName: '{{name}}',
              userEmail: '{{email}}',
            },
          },
        }}
      >
        <SuperInput name="name" label="姓名"></SuperInput>
        <SuperEmail name="email" label="邮箱"></SuperEmail>
      </SuperForm>
    </SuperProvider>
  );
};

export default Demo;
