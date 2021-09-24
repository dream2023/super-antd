import React from 'react';

import { SuperCodeEditor, SuperForm, SuperInput } from 'super-antd';

const App = () => {
  return (
    <SuperForm
      debug
      readonly
      initialValues={{
        name: 'jack',
        sql: 'SELECT LastName FROM Persons;',
      }}
    >
      <SuperInput name="name" label="提交者" />
      <SuperCodeEditor language="sql" name="sql" label="SQL" />
    </SuperForm>
  );
};

export default App;
