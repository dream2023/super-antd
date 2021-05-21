import { Card } from 'antd';
import React from 'react';

import { SuperForm, SuperInput, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

const Demo = () => {
  return (
    // 1.必须使用 SuperProvider 放在祖先组件上
    <SuperProvider axios={axiosInstance}>
      <Card type="inner" title="表单1">
        {/* 2.指定 refreshName 为需要刷新组件的名称 */}
        <SuperForm refreshName="form2" btns={{ submitBtn: '点击提交试试' }}>
          <SuperInput name="name" label="姓名"></SuperInput>
        </SuperForm>
      </Card>
      <br />
      <Card type="inner" title="表单2">
        <SuperForm
          name="form2"
          initApi={{
            url: '/user/1',
            response: {
              name: '{{data.first_name}}-{{data.last_name}}',
            },
          }}
        >
          <SuperInput name="name" label="姓名"></SuperInput>
        </SuperForm>
      </Card>
    </SuperProvider>
  );
};

export default Demo;
