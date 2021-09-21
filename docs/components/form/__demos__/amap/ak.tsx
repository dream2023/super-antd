import React from 'react';

import { SuperAmap, SuperAmapProps, SuperForm, SuperInput, withDefaultProps } from 'super-antd';

const MyAmap = withDefaultProps<SuperAmapProps>(SuperAmap, {
  ak: 'a7a90e05a37d3f6bf76d4a9032fc9129',
});

const App = () => {
  return (
    <SuperForm debug>
      <SuperInput label="姓名" name="name"></SuperInput>
      <MyAmap label="住址" name="address" fieldProps={{ showGeolocation: false, showToolBar: false }}></MyAmap>
    </SuperForm>
  );
};

export default App;
