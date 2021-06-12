import React from 'react';

import { SuperForm, SuperInput } from 'super-antd';

const Demo = () => {
  return (
    <SuperForm btns={{ btnsAlign: 'center' }}>
      <SuperInput labelCol={8} wrapperCol={8} name="name" label="姓名"></SuperInput>
      <SuperInput labelCol={8} wrapperCol={8} name="phone" label="手机号"></SuperInput>
    </SuperForm>
  );
};

export default Demo;
