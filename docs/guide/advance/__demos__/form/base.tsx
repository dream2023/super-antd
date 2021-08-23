import React from 'react';

import { SuperForm, SuperInput } from 'super-antd';

import SuperQuill from './super-quill';

const App = () => {
  return (
    <SuperForm debug>
      <SuperInput name="name" label="姓名" />
      <SuperQuill name="description" label="介绍" />
    </SuperForm>
  );
};

export default App;
