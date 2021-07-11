import { Radio } from 'antd';
import React, { useState } from 'react';

import { SuperCheckboxGroup, SuperEmail, SuperForm, SuperInput, SuperNumber } from 'super-antd';

const Demo = () => {
  const [itemCount, setItemCount] = useState<number>(3);
  return (
    <>
      <div style={{ margin: 20 }}>
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
          value={itemCount}
          onChange={(e) => setItemCount(Number(e.target.value))}
          options={[
            { value: 1, label: '一列' },
            { value: 2, label: '两列' },
            { value: 3, label: '三列' },
          ]}
        ></Radio.Group>
      </div>

      <SuperForm itemCount={itemCount} layout="vertical">
        <SuperInput name="name" label="姓名"></SuperInput>
        <SuperNumber name="age" label="年龄"></SuperNumber>
        <SuperCheckboxGroup name="sex" label="性别" options={['男', '女']}></SuperCheckboxGroup>
        <SuperInput name="like" label="爱好"></SuperInput>
        <SuperEmail name="address" label="地址" itemSpan={16}></SuperEmail>
      </SuperForm>
    </>
  );
};

export default Demo;
