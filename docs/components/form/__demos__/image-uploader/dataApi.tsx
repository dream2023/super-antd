import React from 'react';

import { SuperForm, SuperImageUploader, SuperInput, SuperProvider, withDefaultProps } from 'super-antd';

import axiosInstance from './axios-instance';

const MyImageUploader = withDefaultProps(SuperImageUploader, {
  // action: 'https://xxxx.oss-cn-beijing.aliyuncs.com/', // 应该是阿里 OSS 上传地址
  action: 'https://www.fastmock.site/mock/32d872e565fbab87ba76057c18f7f8e0/api/upload',
  dataApi: '/ali/oss',
  formatter: (response, file, data) => {
    // 应该返回 oss 域名 + key
    // return 'https://xxxx.oss-cn-beijing.aliyuncs.com/' + data.key
    // 这里为了不报错，就随便返回一张图片了，大家明白就行
    return 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
  },
});

const Demo = () => {
  return (
    <SuperProvider axios={axiosInstance}>
      <SuperForm debug>
        <SuperInput name="name" label="姓名" />
        <MyImageUploader name="avatar" label="头像" />
      </SuperForm>
    </SuperProvider>
  );
};

export default Demo;
