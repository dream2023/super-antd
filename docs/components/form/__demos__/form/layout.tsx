import { Radio } from 'antd';
import type { FormLayout } from 'antd/lib/form/Form';
import React, { useState } from 'react';

import { SuperEmail, SuperForm, SuperInput, SuperNumber } from 'super-antd';

const Demo = () => {
  const [layout, setLayout] = useState<FormLayout>();
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <Radio.Group
          options={[
            { label: 'horizontal', value: 'horizontal' },
            { label: 'vertical', value: 'vertical' },
            { label: 'inline', value: 'inline' },
          ]}
          onChange={(e) => setLayout(e.target.value)}
          value={layout}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <SuperForm layout={layout}>
        <SuperInput name="name" label="姓名"></SuperInput>
        <SuperNumber name="age" label="年龄"></SuperNumber>
        <SuperEmail name="email" label="邮箱"></SuperEmail>
      </SuperForm>
    </>
  );
};

export default Demo;
