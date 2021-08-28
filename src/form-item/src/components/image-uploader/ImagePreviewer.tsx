import type { noop } from 'ahooks/lib/usePersistFn';
import type { UploadProps } from 'antd';
import { Image } from 'antd';
import type { FC } from 'react';
import React from 'react';

interface ImagePreviewerProps {
  // 是否显示
  visible?: boolean;
  // 当前是第几张图片
  current?: number;
  // 当隐藏
  onHide?: noop;
  // 文件列表
  fileList: UploadProps['fileList'];
}

const ImagePreviewer: FC<ImagePreviewerProps> = ({ visible, fileList, current = 0, onHide }) => {
  if (!visible) return null;
  return (
    <Image.PreviewGroup
      preview={{
        visible: true,
        current,
        onVisibleChange: onHide,
      }}
    >
      {fileList?.map((file) => (
        <Image style={{ width: 0 }} src={file.url || file.thumbUrl} key={file.uid} />
      ))}
    </Image.PreviewGroup>
  );
};

export default ImagePreviewer;
