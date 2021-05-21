import React from 'react';

import { SuperForm, SuperInput, SuperNumber, SuperProvider } from 'super-antd';

const App = () => {
  return (
    <SuperProvider delimiters={['${', '}']}>
      <SuperForm>
        <SuperInput name="name" label="姓名" />
        <SuperNumber
          name="age"
          linkageFields={['name']}
          disabledOn="${!data.name}" // 分隔符改变
          label="年龄"
        />
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
