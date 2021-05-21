import React from 'react';

import { SuperEmail, SuperForm, SuperInput, SuperProvider } from 'super-antd';

const Demo = () => {
  return (
    <SuperProvider>
      <h2>A 表单</h2>
      <SuperForm updateName="b-form">
        <SuperInput name="name" label="姓名"></SuperInput>
        <SuperEmail name="email" label="邮箱"></SuperEmail>
      </SuperForm>

      <h2>B 表单</h2>
      <SuperForm name="b-form" readonly>
        <SuperInput name="name" label="姓名"></SuperInput>
        <SuperEmail name="email" label="邮箱"></SuperEmail>
      </SuperForm>
    </SuperProvider>
  );
};

export default Demo;
