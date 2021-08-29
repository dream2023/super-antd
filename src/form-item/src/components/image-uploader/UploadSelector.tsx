import type { ProFieldProps } from '@ant-design/pro-utils/lib/typing';
import type { FC } from 'react';
import React from 'react';

export interface UploadSelectorProps {
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
  // 上传最大数量
  max: number;
  // 是否多选
  multiple?: boolean;
  // 文件
  filesCount: number;
  // 是否为只读模式
  mode?: ProFieldProps['mode'];
  // 预览图限制
  previewStyle?: { width: number; height: number };
}

const UploadSelector: FC<UploadSelectorProps> = ({
  icon,
  title,
  max,
  multiple,
  filesCount,
  mode,
  previewStyle = {},
}) => {
  // 是否显示上传
  const showUpload = (multiple || filesCount < max) && mode !== 'read';
  if (!showUpload) return null;

  return (
    <div className="super-antd-center" style={previewStyle}>
      <div>
        <div>{icon}</div>
        <div>{title}</div>
      </div>
    </div>
  );
};

export default UploadSelector;
