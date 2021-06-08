import { Button } from 'antd';
import React from 'react';

import { SuperEmail, SuperForm, SuperInput } from 'super-antd';

const Demo = () => {
  return (
    <SuperForm
      btns={{
        render(data, doms) {
          return (
            <Button type="primary" htmlType="submit">
              自定义的提交
            </Button>
          );
        },
      }}
    >
      <SuperInput name="name" label="姓名"></SuperInput>
      <SuperEmail name="email" label="邮箱"></SuperEmail>
    </SuperForm>
  );
};

export default Demo;
