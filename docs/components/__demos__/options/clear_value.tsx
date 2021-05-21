import React from 'react';

import { SuperForm, SuperProvider, SuperSelect } from 'super-antd';

import axiosInstance from './axios-instance';

const App = () => {
  return (
    <SuperProvider axios={axiosInstance}>
      <SuperForm>
        <SuperSelect
          name="province"
          label="省份"
          options={[
            { label: '广东', value: 'guangdong' },
            { label: '河南', value: 'henan' },
          ]}
        ></SuperSelect>
        {/* 增加 clearValueAfterOptionsChange 属性 */}
        <SuperSelect
          clearValueAfterOptionsChange
          visibleOn={(data) => data.province}
          name="city"
          label="城市"
          linkageFields="province"
          options="/city?province={{data.province}}"
        ></SuperSelect>
      </SuperForm>
    </SuperProvider>
  );
};

export default App;
