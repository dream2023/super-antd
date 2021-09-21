import React from 'react';

import { SuperBaiduMap, SuperForm, SuperInput } from 'super-antd';

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
      <SuperBaiduMap readonly label="住址" name="address" ak="GTrnXa5hwXGwgQnTBG28SHBubErMKm3f"></SuperBaiduMap>
    </SuperForm>
  );
};

export default App;
