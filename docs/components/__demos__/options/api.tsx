import React from 'react';

import { SuperForm, SuperProvider, SuperSelect } from 'super-antd';

import axios from './axios-instance';

const Demo = () => {
  return (
    <SuperProvider axios={axios}>
      <SuperForm debug>
        <SuperSelect
          name="role"
          label="角色"
          options={{
            url: '/users',
            method: 'GET',
            response: (data) => {
              return data.map((item: any) => ({ label: item.name, value: item.id }));
            },
          }}
        />
      </SuperForm>
    </SuperProvider>
  );
};

export default Demo;
