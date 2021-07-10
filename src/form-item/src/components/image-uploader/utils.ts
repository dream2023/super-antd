import type { RcFile, UploadFile } from 'antd/lib/upload/interface';
import bytes from 'bytes';

// 获取图片的大小
export const measureImage = (
  file: RcFile,
): Promise<{
  width: number;
  height: number;
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      const replaceSrc = evt?.target?.result;
      const imageObj = new Image();
      imageObj.src = String(replaceSrc);
      imageObj.onload = () => {
        resolve({
          width: imageObj.width,
          height: imageObj.height,
        });
      };
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

// 基础的图片类型检查
// 其他类型，不做检查，使用 accept 自动过滤
export const checkImageType = (image: RcFile): string | undefined => {
  if (!image.type || !image.type.includes('image')) {
    return `${image.name} 不是图片类型`;
  }
  return undefined;
};

// 文件大小检查
export const checkImageSize = (file: RcFile, maxSize?: number): string | undefined => {
  if (maxSize) {
    if (Number(file.size) > maxSize * 1024) {
      return `${file.name} 超出 ${bytes(maxSize * 1024)} 限制`;
    }
  }

  return undefined;
};

/**
 * 图片限制
 */
export interface ImageLimit {
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

// 检查文件宽高等尺寸
export const checkImageLimit = (
  fileName: string,
  width: number,
  height: number,
  limit?: ImageLimit,
): string | undefined => {
  if (!limit) return undefined;

  if (limit.minWidth && width < limit.minWidth) {
    return `${fileName} 最小宽度为 ${limit.minWidth} 像素，当前为 ${width} 像素`;
  }
  if (limit.minHeight && height < limit.minHeight) {
    return `${fileName} 最小高度为 ${limit.minHeight} 像素，当前为 ${height} 像素`;
  }
  if (limit.maxWidth && width > limit.maxWidth) {
    return `${fileName} 最大宽度为 ${limit.maxWidth} 像素，当前为 ${width} 像素`;
  }
  if (limit.maxHeight && height > limit.maxHeight) {
    return `${fileName} 最大高度为 ${limit.maxHeight} 像素，当前为 ${height} 像素`;
  }
  if (limit.width && width !== limit.width) {
    return `${fileName} 宽度应为 ${limit.width} 像素，当前为 ${width} 像素`;
  }
  if (limit.height && height !== limit.height) {
    return `${fileName} 高度应为 ${limit.height} 像素，当前为 ${height} 像素`;
  }
  // 比例允许一点点误差，因为截图导致的
  if (limit.aspectRatio && width / height - limit.aspectRatio > 0.01) {
    return `${fileName} 图片宽高比应为 ${limit.aspectRatio}，当前宽高比为 ${width / height}`;
  }

  return undefined;
};

// 上传前检查文件
export async function checkFile({
  file,
  maxSize,
  limit,
}: {
  file: RcFile;
  limit?: ImageLimit;
  maxSize?: number;
}): Promise<string | undefined> {
  let errMsg = checkImageType(file);
  if (errMsg) return errMsg;
  errMsg = checkImageSize(file, maxSize);
  if (errMsg) return errMsg;

  const { width, height } = await measureImage(file);
  errMsg = await checkImageLimit(file.name, width, height, limit);
  if (errMsg) return errMsg;

  return undefined;
}

// 将 value 转为文件列表
export function changeValueToFileList(arrValue: any[], urlKey?: string, uidKey?: string): UploadFile<any>[] {
  return arrValue.map((file) => {
    if (typeof file === 'string') {
      // 字符串类型，转为对象
      return {
        uid: file,
        name: file,
        url: file,
        _isUrl: true,
      };
    }

    if (file && typeof file === 'object') {
      // 对象类型，要获取 url 和 uid
      let { url } = file;
      if (!url && urlKey && file[urlKey]) {
        url = file[urlKey];
      }

      let { uid } = file;
      if (!uid && uidKey && file[uidKey]) {
        uid = file[uidKey];
      }
      return {
        ...file,
        url,
        uid,
      };
    }
    return file;
  });
}

// 获取预览图宽高

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
export const getPreviewLimit = (
  previewLimit: PreviewLimit = {},
  limit: ImageLimit = {},
): { width: number; height: number } => {
  const defaultSize = 120;
  const { width, height, aspectRatio: previewAspectRatio } = previewLimit;
  const { aspectRatio: limitAspectRatio } = limit;
  const aspectRatio = previewAspectRatio || limitAspectRatio;
  if (aspectRatio && !(width && height)) {
    if (width && !height) {
      return { width, height: width / aspectRatio };
    }
    if (height && !width) {
      return { width: aspectRatio * height, height };
    }

    return {
      width: defaultSize,
      height: defaultSize / aspectRatio,
    };
  }

  return { width: width || defaultSize, height: height || defaultSize };
};

// 获取提示语
export function getTip({
  limit,
  max,
  maxSize,
  accept,
}: {
  accept?: string;
  max?: number;
  maxSize?: number;
  limit?: ImageLimit;
}): string | undefined {
  const res = [];
  // 个数
  if (Number(max) > 1) {
    res.push(`最多上传 ${max} 张图片`);
  }
  // 大小
  if (maxSize) {
    res.push(`大小不超过 ${bytes(maxSize * 1024)}`);
  }
  // 文件类型
  if (accept) {
    res.push(`仅支持 ${accept} 类型格式图片`);
  }
  if (limit?.aspectRatio) {
    res.push(`比例应为 ${limit.aspectRatio}`);
  }
  // 宽高
  if (limit?.width) {
    res.push(`宽度为 ${limit.width} 像素`);
  }
  if (limit?.height) {
    res.push(`高度为 ${limit.height} 像素`);
  }
  if (limit?.minWidth) {
    res.push(`最小宽度为 ${limit.minWidth} 像素`);
  }
  if (limit?.maxWidth) {
    res.push(`最大宽度为 ${limit.maxWidth} 像素`);
  }
  if (limit?.minHeight) {
    res.push(`最小高度为 ${limit.minHeight} 像素`);
  }
  if (limit?.maxHeight) {
    res.push(`最大高度为 ${limit.maxHeight} 像素`);
  }
  return res.length ? `${res.join('，')}。` : undefined;
}
