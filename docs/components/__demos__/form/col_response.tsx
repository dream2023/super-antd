import React from 'react';

import { SuperCheckbox, SuperEmail, SuperForm, SuperInput } from 'super-antd';

const Demo = () => {
  return (
    <div>
      <h2>响应式表单（默认开启）</h2>
      <SuperForm>
        <SuperInput name="name" label="姓名"></SuperInput>
        <SuperEmail name="email" label="邮箱"></SuperEmail>
        <SuperCheckbox name="remember" text="Remember me"></SuperCheckbox>
      </SuperForm>

      <h2>非响应式表单</h2>
      <SuperForm isResponsive={false}>
        <SuperInput name="name" label="姓名"></SuperInput>
        <SuperInput name="email" label="邮箱"></SuperInput>
      </SuperForm>
    </div>
  );
};

export default Demo;
