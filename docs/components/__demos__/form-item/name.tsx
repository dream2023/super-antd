import React from 'react';

import { SuperForm, SuperGroup, SuperInput } from 'super-antd';

const Demo = () => {
  return (
    <SuperForm debug>
      <SuperGroup label="基本信息">
        <SuperInput name="user.name" label="姓名" required hideLabel rules={[{ type: 'string', min: 2 }]}></SuperInput>
        <SuperInput hideLabel name="user.age" label="年龄"></SuperInput>
      </SuperGroup>
    </SuperForm>
  );
};

export default Demo;
