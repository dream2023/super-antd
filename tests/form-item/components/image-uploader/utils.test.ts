import {
  changeValueToFileList,
  checkFile,
  checkImageLimit,
  checkImageSize,
  checkImageType,
  getPreviewLimit,
  getTip,
} from '@/form-item/src/components/image-uploader/utils';

describe('getTip', () => {
  test('当无参数时，应返回 undefined', () => {
    expect(getTip({})).toBeUndefined();
  });

  test('当 max 大于 1 时，应提示', () => {
    expect(getTip({ max: 1 })).toBeUndefined();
    expect(getTip({ max: 2 })).toBe('最多上传 2 张图片。');
  });

  test('当 maxSize 有值时，应提示', () => {
    expect(getTip({ maxSize: 100 })).toBe('大小不超过 100KB。');
  });

  test('当 accept 有值时，应提示', () => {
    expect(getTip({ accept: '.jpg,.png' })).toBe('仅支持 .jpg,.png 类型格式图片。');
  });

  test('当 limit.aspectRatio 有值时，应提示', () => {
    expect(getTip({ limit: { aspectRatio: 1 / 2 } })).toBe('比例应为 0.5。');
  });
  test('当 limit.width 有值时，应提示', () => {
    expect(getTip({ limit: { width: 200 } })).toBe('宽度为 200 像素。');
  });
  test('当 limit.height 有值时，应提示', () => {
    expect(getTip({ limit: { height: 200 } })).toBe('高度为 200 像素。');
  });
  test('当 limit.minWidth 有值时，应提示', () => {
    expect(getTip({ limit: { minWidth: 200 } })).toBe('最小宽度为 200 像素。');
  });
  test('当 limit.maxWidth 有值时，应提示', () => {
    expect(getTip({ limit: { maxWidth: 200 } })).toBe('最大宽度为 200 像素。');
  });
  test('当 limit.minHeight 有值时，应提示', () => {
    expect(getTip({ limit: { minHeight: 200 } })).toBe('最小高度为 200 像素。');
  });
  test('当 limit.maxHeight 有值时，应提示', () => {
    expect(getTip({ limit: { maxHeight: 200 } })).toBe('最大高度为 200 像素。');
  });
  test('多种提示，应有[，]拼接', () => {
    expect(getTip({ limit: { minWidth: 200, maxHeight: 200 } })).toBe('最小宽度为 200 像素，最大高度为 200 像素。');
  });
});

describe('checkImageType', () => {
  test('当 file.type 不存在时，应返回错误信息', () => {
    expect(checkImageType({ name: 'test.json' } as any)).toBe('test.json 不是图片类型');
  });

  test('当 file.type 不包含 image 时，应返回错误信息', () => {
    expect(checkImageType({ name: 'test.json', type: 'application/json' } as any)).toBe('test.json 不是图片类型');
  });

  test('当 file.type 包含 image 时，应返回 undefined', () => {
    expect(checkImageType({ name: 'test.png', type: 'image/png' } as any)).toBeUndefined();
  });
});

describe('checkImageSize', () => {
  test('当没有设置 maxSize 时，应返回 undefined', () => {
    expect(checkImageSize({} as any)).toBeUndefined();
  });

  test('当 file.size 小于 maxSize 时，应返回 undefined', () => {
    expect(checkImageSize({ size: 10 * 1024 } as any, 100)).toBeUndefined();
  });

  test('当 file.size 大于 maxSize 时，应返回错误信息', () => {
    expect(checkImageSize({ size: 100 * 1024, name: 'test.png' } as any, 99)).toBe('test.png 超出 99KB 限制');
  });
});

describe('checkImageLimit', () => {
  const fileName = 'test.png';
  const width = 100;
  const height = 100;
  const checkImageLimitWithParams = checkImageLimit.bind(null, fileName, width, height);

  test('当无 limit 限制时，应返回 undefined', () => {
    expect(checkImageLimitWithParams()).toBeUndefined();
  });

  test('当 limit.minWidth 有值且 width < limit.minWidth 时，应返回错误信息', () => {
    expect(checkImageLimitWithParams({ minWidth: 110 })).toBe('test.png 最小宽度为 110 像素，当前为 100 像素');
  });

  test('当 limit.minWidth 有值且 width > limit.minWidth 时，应返回 undefined', () => {
    expect(checkImageLimitWithParams({ minWidth: 90 })).toBeUndefined();
  });

  test('当 limit.minHeight 有值且 height < limit.minHeight 时，应返回错误信息', () => {
    expect(checkImageLimitWithParams({ minHeight: 110 })).toBe('test.png 最小高度为 110 像素，当前为 100 像素');
  });

  test('当 limit.minHeight 有值且 height > limit.minHeight 时，应返回 undefined', () => {
    expect(checkImageLimitWithParams({ minHeight: 90 })).toBeUndefined();
  });

  test('当 limit.maxWidth 有值且 width > limit.maxWidth 时，应返回错误信息', () => {
    expect(checkImageLimitWithParams({ maxWidth: 90 })).toBe('test.png 最大宽度为 90 像素，当前为 100 像素');
  });

  test('当 limit.maxWidth 有值且 width < limit.maxWidth 时，应返回 undefined', () => {
    expect(checkImageLimitWithParams({ maxWidth: 100 })).toBeUndefined();
  });

  test('当 limit.maxHeight 有值且 height > limit.maxHeight 时，应返回错误信息', () => {
    expect(checkImageLimitWithParams({ maxHeight: 90 })).toBe('test.png 最大高度为 90 像素，当前为 100 像素');
  });

  test('当 limit.maxHeight 有值且 height < limit.maxHeight 时，应返回 undefined', () => {
    expect(checkImageLimitWithParams({ maxHeight: 110 })).toBeUndefined();
  });

  test('当 limit.width 有值且 width !== limit.width 时，应返回错误信息', () => {
    expect(checkImageLimitWithParams({ width: 110 })).toBe('test.png 宽度应为 110 像素，当前为 100 像素');
  });

  test('当 limit.width 有值且 width === limit.width 时，应返回 undefined', () => {
    expect(checkImageLimitWithParams({ width: 100 })).toBeUndefined();
  });

  test('当 limit.height 有值且 height !== limit.height 时，应返回错误信息', () => {
    expect(checkImageLimitWithParams({ height: 110 })).toBe('test.png 高度应为 110 像素，当前为 100 像素');
  });

  test('当 limit.height 有值且 height === limit.height 时，应返回 undefined', () => {
    expect(checkImageLimitWithParams({ height: 100 })).toBeUndefined();
  });

  test('当 limit.aspectRatio 有值且 width / height - limit.aspectRatio > 0.01 时，应返回错误信息', () => {
    expect(checkImageLimitWithParams({ aspectRatio: 1 / 2 })).toBe('test.png 图片宽高比应为 0.5，当前宽高比为 1');
  });
});

describe('checkFile', () => {
  test('当类型发生错误时，应返回错误信息', async () => {
    expect(await checkFile({ file: { name: 'test.json', type: 'application/json' } as any })).toBe(
      'test.json 不是图片类型',
    );
  });

  test('当文件大小有错误时，应返回错误信息', async () => {
    expect(
      await checkFile({ file: { name: 'test.png', type: 'image/png', size: 100 * 1024 } as any, maxSize: 99 }),
    ).toBe('test.png 超出 99KB 限制');
  });
});

describe('changeValueToFileList', () => {
  test('当 file 为字符串时，则转为 RcFile 类型', () => {
    const url = 'https://www.baidu.com';
    expect(changeValueToFileList([url])).toEqual([
      {
        uid: url,
        name: url,
        url: url,
        _isUrl: true,
      },
    ]);
  });

  test('当 file 为 object 时，则返回对象', () => {
    expect(
      changeValueToFileList([{ uid: 1, url: 'https://www.baidu.com', name: 'foo.png' }, { name: 'bar.png' }]),
    ).toEqual([{ uid: 1, url: 'https://www.baidu.com', name: 'foo.png' }, { name: 'bar.png' }]);
  });

  test('当 file 为 object 时，且存在 urkKey 和 uidKey，则返回处理后的对象', () => {
    expect(
      changeValueToFileList(
        [
          { id: 1, img: 'https://foo.com', name: 'foo.png' },
          { id: 2, img: 'https://bar.com', name: 'bar.png' },
        ],
        'img',
        'id',
      ),
    ).toEqual([
      { uid: 1, id: 1, img: 'https://foo.com', url: 'https://foo.com', name: 'foo.png' },
      { uid: 2, id: 2, img: 'https://bar.com', url: 'https://bar.com', name: 'bar.png' },
    ]);
  });

  test('当 file 为其他类型时，直接返回', () => {
    expect(changeValueToFileList([null, undefined, 123])).toEqual([null, undefined, 123]);
  });
});

describe('getPreviewLimit', () => {
  test('默认值为 120', () => {
    expect(getPreviewLimit()).toEqual({ width: 120, height: 120 });
  });

  test('如果传递了 width 或者 height，则以传递的为准', () => {
    expect(getPreviewLimit({ width: 100, height: 100 })).toEqual({ width: 100, height: 100 });
  });

  test('如果 aspectRatio 存在，且 width、height 均不存在，则根据 aspectRatio 计算出宽高', () => {
    expect(getPreviewLimit({ aspectRatio: 1 / 2 })).toEqual({ width: 120, height: 240 });
  });

  test('如果 aspectRatio 存在，且 width 存在，则根据 aspectRatio 计算出 height', () => {
    expect(getPreviewLimit({ width: 100, aspectRatio: 1 / 2 })).toEqual({ width: 100, height: 200 });
  });

  test('如果 aspectRatio 存在，且 height 存在，则根据 aspectRatio 计算出 width ', () => {
    expect(getPreviewLimit({ height: 100, aspectRatio: 1 / 2 })).toEqual({ width: 50, height: 100 });
  });

  test('如果 aspectRatio、width、height 都存在，则返回 width 和 height', () => {
    expect(getPreviewLimit({ height: 100, width: 100, aspectRatio: 1 / 2 })).toEqual({ width: 100, height: 100 });
  });

  test('当 previewLimit aspectRatio 不存在时，limit 的 aspectRatio 存在，则使用 不存在时，limit.aspectRatio', () => {
    expect(getPreviewLimit({}, { aspectRatio: 0.5 })).toEqual({ width: 120, height: 240 });
  });
});
