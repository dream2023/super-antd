import React from 'react';

import { SuperBaiduMap, SuperForm, SuperInput } from 'super-antd';

const App = () => {
  return (
    <SuperForm debug>
      <SuperInput label="姓名" name="name"></SuperInput>
      <SuperBaiduMap label="住址" name="address" ak="GTrnXa5hwXGwgQnTBG28SHBubErMKm3f"></SuperBaiduMap>
    </SuperForm>
  );
};

export default App;
