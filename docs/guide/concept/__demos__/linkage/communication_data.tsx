import { Card } from 'antd';
import React from 'react';

import { SuperForm, SuperInput, SuperProvider } from 'super-antd';

const Demo = () => {
  return (
    // 1.必须使用 SuperProvider 放在祖先组件上
    <SuperProvider>
      <Card type="inner" title="表单1">
        {/* 2.指定 updateName 为需要刷新组件的名称 */}
        <SuperForm updateName="form2" btns={{ submitBtn: '点击提交试试' }}>
          <SuperInput name="name" label="姓名"></SuperInput>
        </SuperForm>
      </Card>
      <br />
      <Card type="inner" title="表单2">
        <SuperForm name="form2">
          <SuperInput name="name" label="姓名"></SuperInput>
        </SuperForm>
      </Card>
    </SuperProvider>
  );
};

export default Demo;
