import { Button } from 'antd';
import React from 'react';

import { SuperEmail, SuperForm, SuperInput } from 'super-antd';

const Demo = () => {
  return (
    <SuperForm
      btns={{
        extraBtns: [
          {
            type: 'default',
            text: '测试文本',
            key: 'test',
            onClick: () => {
              alert('test');
            },
            visible: true, // 默认也为 true，当为 false 时，会隐藏
          },
          <Button key="print" onClick={() => window.print()}>
            打印
          </Button>,
        ],
      }}
    >
      <SuperInput name="name" label="姓名"></SuperInput>
      <SuperEmail name="email" label="邮箱"></SuperEmail>
    </SuperForm>
  );
};

export default Demo;
