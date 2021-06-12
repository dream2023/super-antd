import { Checkbox, Form, Input } from 'antd';
import React from 'react';

import { SuperCheckbox, SuperEmail, SuperForm, SuperInput } from 'super-antd';

const Demo = () => {
  return (
    <div>
      <h2>无 label 时自动对齐</h2>
      <SuperForm>
        <SuperInput name="name" label="姓名"></SuperInput>
        <SuperEmail name="email" label="邮箱"></SuperEmail>
        <SuperCheckbox name="remember" text="记住登录"></SuperCheckbox>
      </SuperForm>

      <h2>antd Form 无法对齐</h2>
      <Form labelCol={{ span: 3 }}>
        <Form.Item name="name" label="姓名">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="邮箱">
          <Input />
        </Form.Item>
        <Form.Item valuePropName="checked" name="remember">
          <Checkbox>记住登录</Checkbox>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Demo;
