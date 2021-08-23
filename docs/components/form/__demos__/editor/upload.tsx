import React from 'react';

import { SuperEditor, SuperForm, SuperInput } from 'super-antd';

const App = () => {
  return (
    <SuperForm debug>
      <SuperInput name="name" label="姓名" />
      <SuperEditor
        name="description"
        label="介绍"
        config={{
          menus: ['image'],
          uploadImgServer: 'https://www.fastmock.site/mock/3bff4788a9dad8a803681a2bca5f9cae/api/upload-img',
        }}
      />
    </SuperForm>
  );
};

export default App;
