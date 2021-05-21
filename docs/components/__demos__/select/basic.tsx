import mockjs from 'mockjs';
import React from 'react';

import { SuperCheckboxGroup, SuperForm, SuperProvider, SuperSearchSelect } from 'super-antd';

import axiosInstance from './axios-instance';

// const getUsers: ApiFunction = async (data, params, { keywords }) => {
//   const res = await axiosInstance('http://jsonplaceholder.typicode.com/users?type=' + keywords);
//   const list = Object.values(res);
//   return list.filter((item) => item.name.includes(keywords));
// };

const App = () => {
  return (
    <SuperProvider mockjs={mockjs} axios={axiosInstance}>
      <SuperForm initialValues={{ type: 1 }} debug>
        <SuperCheckboxGroup
          mock
          label="混合类型"
          name="mixed"
          options={['123', 345, { label: 'jack', value: 1 }]}
        ></SuperCheckboxGroup>
        <SuperSearchSelect
          optionsProp={{ labelKey: 'name', valueKey: 'id' }}
          request={{
            url: 'http://jsonplaceholder.typicode.com/users?name={{data.keywords}}',
            method: 'GET',
          }}
          linkageFields={['mixed']}
          name="ss"
          label="sss"
        ></SuperSearchSelect>
        {/*
        <SuperRadioGroup
          label="类型"
          name="type"
          mock
          options={[
            { label: '类型1', value: 1 },
            { label: '类型2', value: 2 },
          ]}
        ></SuperRadioGroup>
        <SuperSelect
          label="sss"
          name="name"
          linkageFields={['type']}
          optionsProp={{ labelKey: 'name', valueKey: 'id' }}
          options={getUsers}
        ></SuperSelect> */}
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
