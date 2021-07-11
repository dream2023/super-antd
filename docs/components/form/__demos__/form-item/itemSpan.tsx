import React from 'react';

import { SuperCheckboxGroup, SuperEmail, SuperForm, SuperInput, SuperNumber } from 'super-antd';

const Demo = () => {
  return (
    <SuperForm itemCount={3} layout="vertical">
      <SuperInput name="name" label="姓名"></SuperInput>
      <SuperNumber name="age" label="年龄"></SuperNumber>
      <SuperCheckboxGroup name="sex" label="性别" options={['男', '女']}></SuperCheckboxGroup>
      <SuperInput name="like" label="爱好"></SuperInput>
      <SuperEmail name="address" label="地址" itemSpan={16}></SuperEmail>
    </SuperForm>
  );
};

export default Demo;
