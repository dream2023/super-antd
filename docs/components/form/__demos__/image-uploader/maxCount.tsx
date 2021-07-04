import React from 'react';

import { SuperForm, SuperImageUploader, SuperInput, withDefaultProps } from 'super-antd';

let index = 0;

const images = [
  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  'https://scpic.chinaz.net/files/pic/pic9/202106/bpic23310.jpg',
];

const MyImageUploader = withDefaultProps(SuperImageUploader, {
  action: 'https://www.fastmock.site/mock/32d872e565fbab87ba76057c18f7f8e0/api/upload',
  formatter: (response) => images[index++],
});

const Demo = () => {
  return (
    <SuperForm debug>
      <SuperInput name="name" label="姓名" />
      <MyImageUploader name="avatar" label="头像" maxCount={2} />
    </SuperForm>
  );
};

export default Demo;
