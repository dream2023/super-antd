import React from 'react';

import { SuperCheckbox, SuperForm, SuperInput, SuperProvider } from 'super-antd';

import axiosInstance from './axios-instance';

const App = () => {
  return (
    <SuperProvider axios={axiosInstance}>
      <SuperForm
        initApi={{
          // 通过 url 直接获取数据
          url: '/user/1',
          // 通过 response 属性轻松完成数据转换和映射
          response: (data) => ({ name: `${data.first_name}·${data.last_name}`, id: data.id }),
        }}
        // 通过 api 数据完成数据提交
        api={{ url: '/user/1', method: 'PUT' }}
        // 通过 redirect 完成提交后的跳转
        redirect="https://bilibili.com"
      >
        <SuperInput name="name" label="姓名" />
        <SuperCheckbox name="cat" label="是否有猫" />
        {/* 通过 visibleOn 和 linkageFields 轻松实现联动 */}
        <SuperInput
          visibleOn={(data) => data.cat}
          linkageFields={['cat']}
          name="cat_name"
          label="猫的名字"
          clearValueAfterHidden
        />
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
