import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ImageUploader from '@/form-item/src/components/image-uploader/ImageUploader';

import { setup, teardown } from './mock';

describe('ImageUploader', () => {
  beforeEach(() => setup());
  afterEach(() => teardown());

  test('accept 默认应该为 image/*', () => {
    const wrapper = render(<ImageUploader action="http://upload.com" />);
    expect(wrapper.container.querySelector('input')).toHaveAttribute('accept', 'image/*');
  });

  test('默认情况下，只能上传 1 张图片', () => {
    const { rerender } = render(<ImageUploader action="http://upload.com" />);
    expect(screen.queryByText(/上传图片/i)).toBeInTheDocument();
    rerender(<ImageUploader action="http://upload.com" value="https://foo.com" />);
    expect(screen.queryByText(/上传图片/i)).not.toBeInTheDocument();
  });

  test('当设置 multiple 时，可多选', () => {
    const { rerender } = render(<ImageUploader action="http://upload.com" />);
    expect(screen.queryByText(/上传图片/i)).toBeInTheDocument();
    rerender(<ImageUploader action="http://upload.com" multiple value="https://foo.com" />);
    expect(screen.queryByText(/上传图片/i)).toBeInTheDocument();
  });

  test('当设置 maxCount 时，当超出时，隐藏', () => {
    const { rerender } = render(<ImageUploader action="http://upload.com" maxCount={2} />);
    expect(screen.queryByText(/上传图片/i)).toBeInTheDocument();
    rerender(<ImageUploader action="http://upload.com" value={['https://foo.com', 'https://bar.com']} />);
    expect(screen.queryByText(/上传图片/i)).not.toBeInTheDocument();
  });

  test('点击后可以预览图片', () => {
    const url = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
    render(<ImageUploader action="http://upload.com" value={url} />);
    expect(screen.queryByRole('img', { name: url })).toBeInTheDocument();
    userEvent.click(screen.getByRole('img', { name: url }));
    expect(document.querySelector('.ant-image-img')).toHaveAttribute('src', url);
  });

  test('当设置了限制时，应该显示提示', () => {
    const { container, rerender } = render(<ImageUploader action="http://upload.com" />);
    expect(container.querySelector('.ant-form-item-extra')).not.toBeInTheDocument();
    rerender(<ImageUploader action="http://upload.com" accept=".jpg" />);
    expect(container.querySelector('.ant-form-item-extra')).toBeInTheDocument();
  });

  test('当设置了限制时且 autoTip 为 false，应该隐藏提示', () => {
    const { container } = render(<ImageUploader action="http://upload.com" />);
    expect(container.querySelector('.ant-form-item-extra')).not.toBeInTheDocument();
  });

  test('当设置 limit.aspectRatio 时，应该对预览图起作用', () => {
    const { container } = render(
      <ImageUploader
        action="http://upload.com"
        limit={{ aspectRatio: 1 / 2 }}
        maxCount={2}
        value="https://foo.com/foo.png"
      />,
    );
    expect(container.querySelector('.super-antd-center')).toHaveStyle({ width: '120px', height: '240px' });
    expect(container.querySelector('.ant-upload-list-item')).toHaveStyle({ width: '120px', height: '240px' });
  });
});
