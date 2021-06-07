import React from 'react';

import { SuperForm, SuperGroup, SuperInput } from 'super-antd';

const App = () => {
  return (
    <SuperForm initialValues={{ address: {} }} debug layout="vertical">
      <SuperGroup>
        <SuperInput name="address.province" label="省份" />
        <SuperInput
          name="address.city"
          visibleOn="{{data.address.province}}"
          linkageFields={['address.province']}
          label="城市"
        />
      </SuperGroup>
    </SuperForm>
  );
};

export default App;
