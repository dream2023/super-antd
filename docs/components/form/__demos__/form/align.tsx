import { Radio } from 'antd';
import React, { useState } from 'react';

import { SuperForm, SuperInput, SuperPassword, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

const App = () => {
  const [align, setAlign] = useState<'center' | 'left' | 'right'>('center');
  return (
    <SuperProvider axios={axiosInstance}>
      {/* align="center" */}
      <div style={{ marginBottom: 20 }}>
        <Radio.Group
          options={[
            { label: 'center', value: 'center' },
            { label: 'left', value: 'left' },
            { label: 'right', value: 'right' },
          ]}
          onChange={(e) => setAlign(e.target.value)}
          value={align}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <SuperForm
        align={align}
        hideLabel
        size="large"
        style={{ width: 330 }}
        btns={{ resetBtn: false, submitBtn: { text: '登录', style: { width: 330 } } }}
      >
        <SuperInput name="name" label="姓名"></SuperInput>
        <SuperPassword name="password" label="密码"></SuperPassword>
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
