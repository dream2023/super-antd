import React from 'react';

import { SuperEditor, SuperForm, SuperInput } from 'super-antd';

const App = () => {
  return (
    <SuperForm debug>
      <SuperInput name="name" label="姓名" />
      <SuperEditor name="description" label="介绍" />
    </SuperForm>
  );
};

export default App;
