import React from 'react';

import { SuperAmap, SuperForm, SuperInput } from 'super-antd';

const App = () => {
  return (
    <SuperForm debug>
      <SuperInput label="姓名" name="name"></SuperInput>
      <SuperAmap label="住址" name="address" ak="a7a90e05a37d3f6bf76d4a9032fc9129"></SuperAmap>
    </SuperForm>
  );
};

export default App;
