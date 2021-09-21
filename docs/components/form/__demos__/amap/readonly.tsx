import React from 'react';

import { SuperAmap, SuperForm, SuperInput } from 'super-antd';

const App = () => {
  return (
    <SuperForm
      debug
      initialValues={{
        address: {
          lng: 114.056287,
          lat: 22.55126,
          address: '广东省深圳市福田区福中一路3011',
        },
      }}
    >
      <SuperInput label="姓名" name="name"></SuperInput>
      <SuperAmap readonly label="住址" name="address" ak="a7a90e05a37d3f6bf76d4a9032fc9129"></SuperAmap>
    </SuperForm>
  );
};

export default App;
