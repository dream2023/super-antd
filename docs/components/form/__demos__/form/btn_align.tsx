import { Radio } from 'antd';
import React, { useState } from 'react';

import { SuperEmail, SuperForm, SuperInput } from 'super-antd';

const Demo = () => {
  const [align, setAlign] = useState<'center' | 'left' | 'right'>('center');
  return (
    <>
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
        btns={{
          btnsAlign: align,
        }}
        style={{ width: 400 }}
        layout="vertical"
        align="center"
      >
        <SuperInput name="name" label="姓名"></SuperInput>
        <SuperEmail name="email" label="邮箱"></SuperEmail>
      </SuperForm>
    </>
  );
};

export default Demo;
