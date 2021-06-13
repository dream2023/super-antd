import { render } from '@testing-library/react';
import { Button, ButtonProps } from 'antd';
import React from 'react';

import { withDefaultProps } from 'super-antd';

describe('withDefaultProps', () => {
  const MyButton = withDefaultProps<ButtonProps>(Button, { type: 'primary' }); // 拥有了  `type` 默认值
  test('默认属性应该生效', () => {
    const wrapper = render(<MyButton>hello world</MyButton>);
    expect(wrapper.container.querySelector('.ant-btn-primary')).toBeInTheDocument();
  });

  test('默认属性可以被覆盖', () => {
    const wrapper = render(<MyButton type="dashed">hello world</MyButton>);
    expect(wrapper.container.querySelector('.ant-btn-dashed')).toBeInTheDocument();
    expect(wrapper.container.querySelector('.ant-btn-primary')).toBeNull();
  });
});
