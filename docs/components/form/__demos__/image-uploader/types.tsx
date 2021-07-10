import type { UploadProps } from 'antd';
import type { UploadFile } from 'antd/lib/upload/interface';
import React, { FC } from 'react';

import type { ApiType } from '@/shared/src/hooks/useAxios/types';

/**
 * 图片限制
 */
export interface Limit {
  /**
   * 图片宽高比
   */
  aspectRatio?: number;
  /**
   * 图片宽度
   */
  width?: number;
  /**
   * 图片高度
   */
  height?: number;
  /**
   * 图片最小宽度
   */
  minWidth?: number;
  /**
   * 图片最小高度
   */
  minHeight?: number;
  /**
   * 最大宽度
   */
  maxWidth?: number;
  /**
   * 最大高度
   */
  maxHeight?: number;
}

/**
 * 预览限制
 */
export interface PreviewLimit {
  /**
   * 宽度
   */
  width?: number;
  /**
   * 高度
   */
  height?: number;
  /**
   * 比例，例如宽高比为 16:9，那么 aspectRatio 为 16 / 9 即可。
   */
  aspectRatio?: number;
}

export interface IImageUploader {
  /**
   * 上传地址
   */
  action?: UploadProps['action'];
  /**
   * 文件类型
   *
   * @default 'image/*'
   */
  accept?: UploadProps['accept'];
  /**
   * 是否开启裁剪
   *
   * @default false
   */
  crop?: boolean;
  /**
   * 上传最大数量
   *
   * @default 1
   */
  maxCount?: number;
  /**
   * 文件大小限制，单位是 kb
   */
  maxSize?: number;
  /**
   * 上传图片的限制
   * 宽、高、最小宽、最小高、最大宽、最大高、比例
   */
  limit?: Limit;
  /**
   * 是否可多选
   */
  multiple?: boolean;
  /**
   * 数据回显时，图片 url 对应的 key
   */
  urlKey?: string;
  /**
   * 图片回显时，uid 对应的 key
   */
  uidKey?: string;
  /**
   * 是否自动根据限制显示提示语
   *
   * @default true
   */
  autoTip?: boolean;
  /**
   * 预览图限制
   *
   * 如果不添加，默认是和 limit 保持一致。
   */
  previewLimit?: PreviewLimit;
  /**
   * 响应结果格式化函数
   */
  formatter?: (response: any, file: UploadFile<any>, data: any) => any;
  /**
   * 上传占位的 icon
   *
   * @default `<UploadOutlined />`
   */
  icon?: React.ReactNode;
  /**
   * 上传占位标题
   */
  title?: React.ReactNode;
  /**
   * 获取上传所需参数
   */
  dataApi?: ApiType;
}

export const ImageUploaderDemo: FC<IImageUploader> = () => <>Demo!</>;

export default ImageUploaderDemo;
