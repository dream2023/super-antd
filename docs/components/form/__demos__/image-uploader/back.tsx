import React from 'react';

import { SuperForm, SuperImageUploader, SuperInput, withDefaultProps } from 'super-antd';

const MyImageUploader = withDefaultProps(SuperImageUploader, {
  action: 'https://www.fastmock.site/mock/32d872e565fbab87ba76057c18f7f8e0/api/upload',
  formatter: (response) => response.url,
});

const Demo = () => {
  return (
    <SuperForm
      debug
      initialValues={{
        posts: [
          { img: 'https://internal-amis-res.cdn.bcebos.com/images/2020-1/1578395692722/4f3cb4202335.jpeg', id: '1' },
          { img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', id: '2' },
        ],
      }}
    >
      <SuperInput name="name" label="姓名" />
      <MyImageUploader name="posts" label="海报" uidKey="id" urlKey="img" />
    </SuperForm>
  );
};

export default Demo;
