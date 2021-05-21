import React from 'react';

import { SuperForm, SuperProvider, SuperSelect } from 'super-antd';

import axios from './axios-instance';

const Demo = () => {
  return (
    <SuperProvider axios={axios}>
      <SuperForm debug initialValues={{ type: 'a' }}>
        <SuperSelect name="type" label="类型" options={['a', 'b', 'c']}></SuperSelect>
        <SuperSelect
          name="type_val"
          label="类型列表"
          linkageFields={['type']}
          options={{
            url: '/options/{{data.type}}',
            response: (data) => {
              return data.list;
            },
          }}
          clearValueAfterOptionsChange
          optionsProp={{ labelKey: 'name', valueKey: 'id' }}
        ></SuperSelect>
      </SuperForm>
    </SuperProvider>
  );
};

export default Demo;
