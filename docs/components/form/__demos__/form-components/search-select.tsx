import React from 'react';

import { SuperForm, SuperProvider, SuperSearchSelect } from 'super-antd';

import axios from './axios-instance';

const Demo = () => {
  return (
    <SuperProvider axios={axios}>
      <SuperForm debug>
        <SuperSearchSelect
          name="animation"
          label="动漫人物"
          request={{
            url: '/search/animation',
            method: 'GET',
            // 参数映射，将 keyWords 转为 name
            params: {
              name: '{{data.keyWords}}',
            },
          }}
          optionsProp={{ labelKey: 'name', valueKey: 'id' }}
        />
      </SuperForm>
    </SuperProvider>
  );
};

export default Demo;
