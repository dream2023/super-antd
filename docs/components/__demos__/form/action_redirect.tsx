import React from 'react';

import { SuperEmail, SuperForm, SuperInput } from 'super-antd';

const Demo = () => {
  return (
    <SuperForm redirect="https://bilibili.com">
      <SuperInput name="name" label="姓名"></SuperInput>
      <SuperEmail name="email" label="邮箱"></SuperEmail>
    </SuperForm>
  );
};

export default Demo;
