import React from 'react';

import { SuperBaiduMap, SuperBaiduMapProps, SuperForm, SuperInput, withDefaultProps } from 'super-antd';

const MyBaiduMap = withDefaultProps<SuperBaiduMapProps>(SuperBaiduMap, {
  ak: 'GTrnXa5hwXGwgQnTBG28SHBubErMKm3f',
});

const App = () => {
  return (
    <SuperForm debug>
      <SuperInput label="姓名" name="name"></SuperInput>
      <MyBaiduMap
        label="住址"
        name="address"
        fieldProps={{ showGeolocation: false, showNavigation: false }}
      ></MyBaiduMap>
    </SuperForm>
  );
};

export default App;
