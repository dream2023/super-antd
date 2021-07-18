import React from 'react';

import { SuperForm, SuperInput, SuperSelect } from 'super-antd';

const Demo = () => {
  return (
    <SuperForm>
      <SuperSelect
        name="grade"
        label="年级"
        options={[
          { value: 1, label: '一年级' },
          { value: 2, label: '二年级' },
        ]}
      ></SuperSelect>
      <SuperInput
        name="headmaster"
        label="年级主任"
        linkageFields="grade"
        visibleOn="{{data.grade}}"
        computed={({ grade }) => (grade === 1 ? '张老师' : '王老师')}
      ></SuperInput>
    </SuperForm>
  );
};

export default Demo;
