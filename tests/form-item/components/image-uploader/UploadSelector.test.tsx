import { render } from '@testing-library/react';
import React from 'react';

import UploadSelector from '@/form-item/src/components/image-uploader/UploadSelector';

describe('UploadSelector', () => {
  test('最大数量不大于 max 时，则不渲染内容', () => {
    const wrapper = render(<UploadSelector max={2} filesCount={2} />);
    expect(wrapper.container.innerHTML).toBe('');
  });

  test('当 multiple 为 true 时，渲染内容', () => {
    const wrapper = render(<UploadSelector multiple max={1} filesCount={2} />);
    expect(wrapper.container.innerHTML).not.toBe('');
  });

  test('当为 mode 为 read 时，则不渲染内容', () => {
    const wrapper = render(<UploadSelector max={2} filesCount={1} mode="read" />);
    expect(wrapper.container.innerHTML).toBe('');
  });

  test('previewStyle、title、icon 应该渲染', () => {
    const wrapper = render(
      <UploadSelector previewStyle={{ width: 200, height: 200 }} title="title" icon="icon" max={2} filesCount={1} />,
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
