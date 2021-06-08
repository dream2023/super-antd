import React from 'react';

import { SuperForm, SuperInput, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

const App = () => {
  return (
    <SuperProvider axios={axiosInstance}>
      <SuperForm
        initApi={{
          url: '/user/1',
          /**
           * 我们通过 response 字段，将请求到的数据 { first_name: '林纳斯', last_name: '托瓦兹', }
           *
           * 转换成了 =>
           *
           * { name: '林纳斯-托瓦兹', }
           */
          response: {
            name: '{{data.first_name}}-{{data.last_name}}',
          },
        }}
        // 类似的，我们在请求时，将 name 再次分割为两个字段
        api={{
          url: '/user/1',
          method: 'PUT',
          data: {
            first_name: '{{data.name.split("-")[0]}}',
            last_name: '{{data.name.split("-")[1]}}',
          },
        }}
      >
        <SuperInput name="name" label="姓名" />
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
