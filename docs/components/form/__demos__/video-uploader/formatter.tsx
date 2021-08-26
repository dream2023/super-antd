import React from 'react';

import { SuperForm, SuperInput, SuperVideoUploader, withDefaultProps } from 'super-antd';

const MyImageUploader = withDefaultProps(SuperVideoUploader, {
  action: 'https://www.fastmock.site/mock/3bff4788a9dad8a803681a2bca5f9cae/api/upload/video',
  formatter: (response) => response.data.url,
});

const Demo = () => {
  return (
    <SuperForm debug>
      <SuperInput name="name" label="姓名" />
      <MyImageUploader name="video" label="视频介绍" />
    </SuperForm>
  );
};

export default Demo;
