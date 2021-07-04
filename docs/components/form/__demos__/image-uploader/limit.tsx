import React from 'react';

import { SuperForm, SuperImageUploader, SuperInput, withDefaultProps } from 'super-antd';

const MyImageUploader = withDefaultProps(SuperImageUploader, {
  action: 'https://www.fastmock.site/mock/32d872e565fbab87ba76057c18f7f8e0/api/upload',
  formatter: (response) => response.url,
});

const Demo = () => {
  return (
    <SuperForm debug>
      <SuperInput name="name" label="姓名" />
      <MyImageUploader
        name="avatar"
        label="头像"
        limit={{
          aspectRatio: 1 / 2,
          minWidth: 100,
          maxWidth: 500,
          minHeight: 200,
          maxHeight: 1000,
        }}
      />
    </SuperForm>
  );
};

export default Demo;
