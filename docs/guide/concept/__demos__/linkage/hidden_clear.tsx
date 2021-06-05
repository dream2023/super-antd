import React from 'react';

import { SuperForm, SuperInput, SuperSelect } from 'super-antd';

const Demo = () => {
  return (
    <SuperForm debug>
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
        clearValueAfterHidden
        linkageFields={['animation']}
        visibleOn="{{data.animation === 1}}"
      ></SuperInput>
    </SuperForm>
  );
};

export default Demo;
