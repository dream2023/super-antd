import React from 'react';

import { SuperForm, SuperSelect } from 'super-antd';

const Demo = () => {
  return (
    <SuperForm debug>
      <SuperSelect
        name="langrage"
        label="编程语言"
        options={['Go', 'Javascript', { label: 'Python', value: 'Python' }]}
      />
    </SuperForm>
  );
};

export default Demo;
