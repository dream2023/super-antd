import React from 'react';

import { SuperForm, SuperInput, SuperSelect } from 'super-antd';

const Demo = () => {
  return (
    <SuperForm initialValues={{ name: '' }} layout="vertical">
      <SuperInput name="name" label="客户名称"></SuperInput>
      <SuperSelect
        name="type"
        linkageFields={['name']}
        label="和《{{ data.name }}》签订合同类型为"
        options={[
          { label: '下线签约', value: 1 },
          { label: '线上签约', value: 2 },
        ]}
      ></SuperSelect>
    </SuperForm>
  );
};

export default Demo;
