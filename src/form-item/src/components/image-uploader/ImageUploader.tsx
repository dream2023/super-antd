import './image-uploader.less';

import { UploadOutlined } from '@ant-design/icons';
import createField from '@ant-design/pro-form/lib/BaseForm/createField';
import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import { useCreation } from 'ahooks';
import type { UploadProps } from 'antd';
import { Upload, message } from 'antd';
import ImageCropper from 'antd-image-cropper';
import type { UploadFile } from 'antd/lib/upload/interface';
import classnames from 'classnames';
import type { FC } from 'react';
import React from 'react';
import { cloneElement, useState } from 'react';
import rfdc from 'rfdc';

import type { ApiType } from 'super-antd';
import { useAxios } from 'super-antd';

import ImagePreviewer from './ImagePreviewer';
import UploadSelector from './UploadSelector';
import type { ImageLimit, PreviewLimit } from './utils';
import { getTip } from './utils';
import { changeValueToFileList, checkFile, getPreviewLimit } from './utils';

const cloneDeep = rfdc();

type ResponseFormatter<T = any> = (response: any, file: UploadFile<T>, data: any) => any;

export interface ImageUploaderProps extends ProFormItemProps<UploadProps> {
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
  limit?: ImageLimit;
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
  formatter?: ResponseFormatter;
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
   * 获取上传数据
   */
  dataApi?: ApiType;
  /**
   * 上传数据
   */
  data?: any;
  value?: any;
  onChange?: UploadProps['onChange'];
}

/**
 * 上传组件
 */
export const ImageUploader: FC<ImageUploaderProps> = ({
  value,
  uidKey,
  action,
  accept,
  maxSize,
  multiple,
  maxCount,
  onChange,
  formatter,
  className,
  data,
  dataApi,
  limit = {},
  fieldProps,
  crop = false,
  proFieldProps,
  urlKey = 'url',
  autoTip = true,
  title = '上传图片',
  previewLimit = {},
  icon = <UploadOutlined />,
}) => {
  // 最大上传数
  const max = maxCount || fieldProps?.maxCount || 1;

  // 是否为多选
  // 一种情况是，当手动指定是多选
  // 另一种情况是，指定了上传数量，则表示多选
  // 如果都不是，则返回 false，表示单选
  const computedMultiple = useCreation(() => {
    if (multiple !== undefined) return multiple;
    if (typeof max === 'number' && max > 1) return true;
    return false;
  }, []);

  // 数组形式的值
  const arrValue = useCreation<any[]>(() => {
    if (Array.isArray(value)) return value;
    if (value === undefined || value === null) return [];
    return [value];
  }, [value]);

  // 监听 value 变化，并做处理，让其符合 fileList 的格式
  const fileList = useCreation(() => {
    return changeValueToFileList(arrValue, urlKey, uidKey);
  }, [arrValue, urlKey, uidKey]);

  // 是否显示预览
  const [preview, setPreview] = useState({
    visible: false,
    current: 0,
  });

  // 预览图宽高
  const previewStyle = useCreation(() => {
    return getPreviewLimit(previewLimit, limit);
  }, [previewLimit]);

  // 提示语
  const computedTip = useCreation(() => {
    return getTip({ limit, max, maxSize, accept });
  }, [limit, max, maxSize, accept]);

  // 获取上传参数
  const { data: uploadData } = useAxios({
    api: dataApi,
  });
  const computedData = useCreation(() => {
    return Object.assign({}, data, uploadData);
  }, [data, uploadData]);

  return (
    <>
      {/* 裁剪 */}
      <ImageCropper crop={crop} {...limit} cropWidth={limit.width} cropHeight={limit.height}>
        {/* 上传 */}
        <Upload
          {...fieldProps}
          maxCount={max}
          multiple={computedMultiple}
          action={action}
          fileList={fileList}
          data={computedData}
          listType="picture-card"
          accept={accept || 'image/*'}
          className={classnames('super-image-uploader', className)}
          // 上传限制
          beforeUpload={async (file, fileList) => {
            const errMsg = await checkFile({ file, maxSize, limit });
            // 当发生错误时
            if (errMsg) {
              message.error(errMsg);
              return Promise.reject();
            }

            if (fieldProps?.beforeUpload) {
              const res = await fieldProps?.beforeUpload(file, fileList);
              return res as any;
            }

            // 自定义检查
            return true;
          }}
          // 图片列表项宽高自定义
          itemRender={(file) => {
            return fieldProps?.itemRender ? fieldProps?.itemRender : cloneElement(file, { style: previewStyle });
          }}
          // 预览
          onPreview={(file) => {
            if (fieldProps?.onPreview) {
              return fieldProps?.onPreview(file);
            }

            const current = fileList.findIndex((item) => item.uid === file.uid);
            setPreview({
              visible: true,
              current,
            });
          }}
          onChange={({ file, fileList }) => {
            // 状态有：uploading done error removed，被 beforeUpload 拦截的文件没有 status 属性
            if (!file?.status) {
              return;
            }

            // 错误提示
            if (file?.status === 'error') {
              message.error('上传图片发生错误');
            }

            let res: any = cloneDeep(fileList)
              .filter((item) => item.status !== 'error') // 移除错误的
              .map((item) => {
                // 当为 done 时，进行 formatter
                if (item.status === 'done' && formatter) {
                  return formatter(item.response, item, data);
                }
                // 如果原来为字符串的，则直接返回字符串
                // eslint-disable-next-line no-underscore-dangle
                if ((item as any)._isUrl) return item.url;
                return item;
              });
            // 对单选和多选的处理
            if (!computedMultiple) {
              // 单选，则需要取第一个值
              // eslint-disable-next-line prefer-destructuring
              res = res[0];
            }
            onChange?.(res);
            fieldProps?.onChange?.(res);
          }}
        >
          {/* 选择器 */}
          <UploadSelector
            icon={icon}
            title={title}
            max={max}
            filesCount={arrValue.length}
            mode={proFieldProps?.mode}
            previewStyle={previewStyle}
          />
        </Upload>
      </ImageCropper>
      {/* 提示 */}
      {autoTip && computedTip && <div className="ant-form-item-extra">{computedTip}</div>}
      {/* 预览 */}
      <ImagePreviewer {...preview} onHide={() => setPreview({ visible: false, current: 0 })} />
    </>
  );
};

export default createField<ImageUploaderProps>(ImageUploader);
