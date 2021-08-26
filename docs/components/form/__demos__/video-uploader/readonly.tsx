import React from 'react';

import { SuperForm, SuperInput, SuperVideoUploader } from 'super-antd';

const Demo = () => {
  return (
    <SuperForm
      debug
      readonly
      initialValues={{
        name: 'jack',
        video: 'https://s3.pstatp.com/aweme/resource/web/static/image/index/tvc-v2_30097df.mp4',
      }}
    >
      <SuperInput name="name" label="姓名" />
      <SuperVideoUploader
        action="https://www.fastmock.site/mock/3bff4788a9dad8a803681a2bca5f9cae/api/upload/video"
        name="video"
        label="视频介绍"
        formatter={(response) => {
          return response.data.url;
        }}
      />
    </SuperForm>
  );
};

export default Demo;
