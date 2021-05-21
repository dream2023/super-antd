import React from 'react';

import { SuperForm, SuperInput, SuperNumber, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

const App = () => {
  return (
    <SuperProvider axios={axiosInstance}>
      <SuperForm
        api={{
          url: '/user/1',
          method: 'POST',
          data: (data: any) => {
            return { myName: data.name, myAge: data.age };
          },
        }}
      >
        <SuperInput name="name" label="姓名"></SuperInput>
        <SuperNumber name="age" label="年龄"></SuperNumber>
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
