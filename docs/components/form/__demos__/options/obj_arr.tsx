import React from 'react';

import { SuperForm, SuperSelect } from 'super-antd';

const Demo = () => {
  return (
    <SuperForm debug>
      <SuperSelect
        name="country"
        label="国家"
        options={[
          { label: '中国', value: 'china' },
          { label: '美国', value: 'usa' },
          { label: '日本', value: 'jp' },
        ]}
      />
    </SuperForm>
  );
};

export default Demo;
