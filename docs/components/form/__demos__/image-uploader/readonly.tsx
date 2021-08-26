import React from 'react';

import { SuperForm, SuperImageUploader, SuperInput } from 'super-antd';

const Demo = () => {
  return (
    <SuperForm
      debug
      readonly
      initialValues={{ avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' }}
    >
      <SuperInput name="name" label="姓名" />
      <SuperImageUploader
        action="https://www.fastmock.site/mock/32d872e565fbab87ba76057c18f7f8e0/api/upload"
        name="avatar"
        label="头像"
        formatter={(response) => {
          return response.url;
        }}
      />
    </SuperForm>
  );
};

export default Demo;
