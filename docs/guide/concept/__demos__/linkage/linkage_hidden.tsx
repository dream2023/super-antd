import React from 'react';

import { SuperForm, SuperInput, SuperSelect } from 'super-antd';

const Demo = () => {
  return (
    <SuperForm>
      <SuperSelect
        name="animation"
        label="动漫"
        options={[
          { label: '看', value: 1 },
          { label: '不看', value: 2 },
        ]}
      ></SuperSelect>
      <SuperInput
        name="name"
        label="动漫名称"
        linkageFields={['animation']} // linkageFields 指明联动字段
        visibleOn={(data: any) => data.animation === 1} // visibleOn 指明显示的条件
      ></SuperInput>
    </SuperForm>
  );
};

export default Demo;
