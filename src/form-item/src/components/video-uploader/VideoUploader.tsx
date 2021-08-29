import './video-uploader.less';

import { CloudUploadOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { ProFormItemProps } from '@ant-design/pro-form';
import createField from '@ant-design/pro-form/lib/BaseForm/createField';
import { useCreation } from 'ahooks';
import { Modal, Progress, Space, Upload, message } from 'antd';
import type { UploadChangeParam, UploadProps } from 'antd/lib/upload';
import type { RcFile, UploadFile } from 'antd/lib/upload/interface';
import type { FC } from 'react';
import React, { useState } from 'react';

import { useAxios } from '@/shared/src/hooks';

const { Dragger } = Upload;
type ResponseFormatter<T = any> = (response: any, file: UploadFile<T>, data: any) => any;

export interface VideoUploaderProps extends ProFormItemProps<UploadProps> {
  // 显示宽度(px)
  width?: number;
  /**
   * 上传地址
   */
  action?: UploadProps['action'];
  /**
   * 文件类型
   *
   * @default 'video/*'
   */
  accept?: UploadProps['accept'];
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
  formatter?: ResponseFormatter;
  /**
   * 获取上传数据
   */
  dataApi?: string;
  /**
   * 上传数据
   */
  data?: any;
  value?: string;
  onChange?: (value?: string) => void;
}

export const VideoUploader: FC<VideoUploaderProps> = ({
  value,
  action,
  maxSize,
  onChange,
  formatter,
  data,
  dataApi,
  fieldProps = {},
  proFieldProps = {},
  accept,
  autoTip = true,
  width = 350,
}) => {
  const [percent, setPercent] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [isVideoVisible, setVideoVisible] = useState<boolean>(false);
  // 获取上传参数
  const { data: uploadData } = useAxios({
    api: dataApi,
  });
  const computedData = useCreation(() => {
    return Object.assign({}, data, uploadData);
  }, [data, uploadData]);

  // 上传前检验
  const handleBeforeUpload = async (file: RcFile) => {
    if (!file.type.includes('video')) {
      message.error(`${file.name}格式不正确, 请上传格式正确的视频`);
      return Promise.reject();
    }

    // 文件大小
    if (maxSize && file.size / 1024 / 1024 > maxSize) {
      message.error(`文件大小不能超过 ${maxSize}Mb`);
      return Promise.reject();
    }

    if (fieldProps?.beforeUpload) {
      const res = await fieldProps?.beforeUpload(file, [file]);
      return res as any;
    }
    return true;
  };

  // 处理上传
  const handleChange = (info: UploadChangeParam) => {
    let { file } = info;
    if (!file?.status) {
      return;
    }

    // 错误提示
    if (file?.status === 'error') {
      message.error('上传视频发生错误');
    }

    setPercent(file.percent || 0);
    if (file.status === 'uploading') {
      setUploading(true);
      return;
    }
    if (file.status === 'done' && formatter) {
      file = formatter(file.response, file, data);
    }

    setUploading(false);
    setPercent(0);

    onChange?.(file as any);
    fieldProps?.onChange?.(file as any);
  };

  if (value) {
    return (
      <>
        <div className="video-uploader-preview">
          <video autoPlay={false} src={value} style={{ width: `${width}px`, height: 'auto' }}>
            您的浏览器不支持视频播放
          </video>

          <span className="video-uploader-preview-actions">
            <Space>
              <EyeOutlined
                onClick={() => setVideoVisible(true)}
                style={{ fontSize: 20, cursor: 'pointer' }}
                color="white"
              />
              &nbsp;
              <DeleteOutlined
                onClick={() => proFieldProps?.mode !== 'read' && fieldProps?.onChange?.(undefined as any)}
                style={{ fontSize: 20, cursor: 'pointer' }}
                color="white"
              />
            </Space>
          </span>
        </div>
        {/*  弹窗显示视频 */}
        <Modal
          width={600}
          centered
          destroyOnClose
          visible={isVideoVisible}
          onCancel={() => setVideoVisible(false)}
          footer={null}
        >
          <video src={value} autoPlay controls style={{ width: '100%', marginTop: 24 }} />
        </Modal>
      </>
    );
  }

  // 只读模式
  if (proFieldProps?.mode === 'read') {
    return null;
  }
  return (
    <div className="video-uploader">
      <Dragger
        {...fieldProps}
        multiple={false}
        data={computedData}
        maxCount={1}
        disabled={percent > 0 && percent < 100}
        accept={accept || 'video/*'}
        showUploadList={false}
        name="file"
        action={action}
        style={{ width }}
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}
      >
        {/* 上传提示和进度 */}
        {uploading ? (
          <Progress type="circle" percent={percent} status="active" />
        ) : (
          <>
            <p className="ant-upload-drag-icon">
              <CloudUploadOutlined />
            </p>
            <p className="ant-upload-hint">
              将视频拖到此处，或 <span className="video-uploader-text">点击上传</span>
            </p>
          </>
        )}
      </Dragger>
      {autoTip && (
        <div className="video-uploader-tip">
          请上传 <span className="video-uploader-tip-text">{accept || '视频'}</span> 格式文件
          {maxSize && (
            <>
              ，且文件大小不超过 <span className="video-uploader-tip-text">{maxSize}</span> MB
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default createField<VideoUploaderProps>(VideoUploader);
