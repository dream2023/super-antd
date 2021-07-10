import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ImagePreviewer from '@/form-item/src/components/image-uploader/ImagePreviewer';

describe('ImagePreviewer', () => {
  const fileList: any = [
    {
      uid: 0,
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: 1,
      thumbUrl: 'https://scpic.chinaz.net/files/pic/pic9/202106/bpic23310.jpg',
    },
  ];

  test('当 visible 为 false 时，应该什么都不渲染', () => {
    render(<ImagePreviewer fileList={fileList} visible={false} />);
    expect(document.querySelector('.ant-image-preview-img')).toBeNull();
  });

  test('当 visible 为 true 时，应该渲染图片列表', () => {
    render(<ImagePreviewer fileList={fileList} visible={true} />);
    expect(document.querySelector('.ant-image-preview-img')).not.toBeNull();
  });

  test('当 current 不存在时，应该渲染第一张', () => {
    render(<ImagePreviewer fileList={fileList} visible={true} />);
    expect(document.querySelector('.ant-image-preview-img')).toHaveAttribute('src', fileList[0].url);
  });

  test('当 current 存在时，应该渲染第 current 张', async () => {
    render(<ImagePreviewer fileList={fileList} current={1} visible={true} />);
    expect(document.querySelector('.ant-image-preview-img')).toHaveAttribute('src', fileList[1].url);
  });

  test('当点击隐藏时，应该调用 onHide', () => {
    const fn = jest.fn();
    render(<ImagePreviewer fileList={fileList} current={1} visible={true} onHide={fn} />);
    userEvent.click(document.querySelector('.anticon-close') as HTMLElement);
    expect(fn).toBeCalled();
  });
});
