import type { UploadFile } from 'antd/lib/upload/interface';
import type { FC } from 'react';
import React from 'react';

export interface IVideoUploaderProps {
  /**
   * 显示宽度
   * @default 350
   */
  width?: number;
  /**
   * 上传地址
   */
  action?: string;
  /**
   * 文件类型
   *
   * @default 'video/*'
   */
  accept?: string;
  /**
   * 文件大小限制，单位是 mb
   */
  maxSize?: number;
  /**
   * 是否自动根据限制显示提示语
   *
   * @default true
   */
  autoTip?: boolean;
  /**
   * 响应结果格式化函数
   */
  formatter?: (response: any, file: UploadFile<any>, data: any) => any;
  /**
   * 获取上传数据
   */
  dataApi?: string;
  /**
   * 上传数据
   */
  data?: any;
}

const Demo: FC<IVideoUploaderProps> = () => {
  return <div>demo</div>;
};

export default Demo;
