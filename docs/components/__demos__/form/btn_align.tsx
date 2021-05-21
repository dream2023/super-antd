import React from 'react';

import { SuperEmail, SuperForm, SuperInput } from 'super-antd';

const Demo = () => {
  return (
    <SuperForm
      btns={{
        btnsAlign: 'center',
      }}
      style={{ width: 400 }}
      layout="vertical"
      align="center"
    >
      <SuperInput name="name" label="姓名"></SuperInput>
      <SuperEmail name="email" label="邮箱"></SuperEmail>
    </SuperForm>
  );
};

export default Demo;
