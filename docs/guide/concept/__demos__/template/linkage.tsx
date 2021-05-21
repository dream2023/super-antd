import React from 'react';

import { SuperForm, SuperInput, SuperSelect } from 'super-antd';

const App = () => {
  return (
    <SuperForm layout="vertical">
      <SuperInput name="name" label="签约客户姓名" />
      <SuperSelect
        visibleOn="{{data.name}}" // visibleOn 使用到了数据模板
        label="与《{{data.name}}》签约方式" // label 使用到了数据模板
        linkageFields="name"
        name="mode"
        options={[
          {
            value: 'online',
            label: '线上签约',
          },
          {
            value: 'offline',
            label: '线下签约',
          },
        ]}
        clearValueAfterHidden
      />
    </SuperForm>
  );
};

export default App;
