import React from 'react';

import { SuperCheckbox, SuperEmail, SuperForm, SuperInput, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

const Demo = () => {
  return (
    <SuperProvider axios={axiosInstance}>
      <SuperForm
        api={{
          method: 'PUT',
          url: '/user/1',
        }}
        message={{ saveSuccess: '保存成功', saveError: '保存失败' }}
      >
        <SuperInput name="name" label="姓名"></SuperInput>
        <SuperEmail name="email" label="邮箱"></SuperEmail>
        <SuperCheckbox name="remember" text="Remember me"></SuperCheckbox>
      </SuperForm>
    </SuperProvider>
  );
};

export default Demo;
