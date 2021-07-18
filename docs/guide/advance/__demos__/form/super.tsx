import React from 'react';

import { SuperCheckbox, SuperForm, SuperInput } from 'super-antd';

import SuperQuill from './super-quill';

const App = () => {
  return (
    <SuperForm debug>
      <SuperInput name="name" label="姓名" />
      <SuperCheckbox name="more" text="更多设置"></SuperCheckbox>
      <SuperQuill name="description" label="介绍" linkageFields="more" visibleOn="{{data.more}}" />
    </SuperForm>
  );
};

export default App;
