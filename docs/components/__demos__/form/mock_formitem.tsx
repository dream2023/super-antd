import mockjs from 'mockjs';
import React from 'react';

import { SuperEmail, SuperForm, SuperInput, SuperProvider } from 'super-antd';

const Demo = () => {
  return (
    <SuperProvider mockjs={mockjs}>
      <SuperForm>
        <SuperInput mock="@cname" name="name" label="姓名"></SuperInput>
        <SuperEmail mock name="email" label="邮箱"></SuperEmail>
      </SuperForm>
    </SuperProvider>
  );
};

export default Demo;
