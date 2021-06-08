import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from 'antd';
import React from 'react';

import { SuperBtns } from 'super-antd';

describe('SuperBtns', () => {
  test('btns 不传时不显示按钮', () => {
    const wrapper = render(<SuperBtns />);
    expect(screen.queryByRole('button')).toBeNull();
    expect(wrapper.container).not.toHaveAttribute('class');
  });
  test('btns 为空时不显示按钮', () => {
    const wrapper = render(<SuperBtns btns={[]} />);
    expect(screen.queryByRole('button')).toBeNull();
    expect(wrapper.container).not.toHaveAttribute('class');
  });

  test('btns 为配置数组', () => {
    const wrapper = render(<SuperBtns btns={[{ type: 'primary', key: 'btn1', size: 'large', children: 'btn' }]} />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass('ant-btn ant-btn-primary ant-btn-lg');
    expect(wrapper.container.querySelector('.ant-space')).not.toBeNull();
  });

  test('btns 为 Button', () => {
    const wrapper = render(
      <SuperBtns
        btns={[
          <Button key="btn2" type="primary" size="large">
            btn2
          </Button>,
        ]}
      />,
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass('ant-btn ant-btn-primary ant-btn-lg');
    expect(wrapper.container.querySelector('.ant-space')).not.toBeNull();
  });

  test('btns 为两者数据混合', () => {
    render(<SuperBtns btns={[{ key: 'btn1', children: 'btn1' }, <Button key="btn2">btn2</Button>]} />);
    expect(screen.getAllByRole('button').length).toBe(2);
  });

  test('按钮事件', () => {
    const onClick = jest.fn();
    render(
      <SuperBtns
        btns={[
          <Button key="btn" onClick={onClick}>
            btn
          </Button>,
        ]}
      />,
    );
    userEvent.click(screen.getByRole('button'));
    expect(onClick).toBeCalled();
  });

  test('text 属性作为 btn 内容', () => {
    render(<SuperBtns btns={[{ key: 'btn', text: 'btn' }]} />);
    expect(screen.getByText('btn')).toBeInTheDocument();
  });

  test('visible 为 false 的默认不展示', () => {
    render(<SuperBtns btns={[{ key: 'btn', visible: false, text: 'btn' }]} />);
    expect(screen.queryByText('btn')).toBeNull();
  });

  test('btnsAlign 对齐', () => {
    const wrapper = render(<SuperBtns btnsAlign="center" btns={[{ key: 'btn', text: 'btn' }]} />);
    expect(wrapper.container.querySelector('.ant-space')).toHaveStyle('justify-content: center;');
  });

  test('className 绑定', () => {
    const wrapper = render(<SuperBtns className="test" btns={[{ key: 'btn', text: 'btn' }]} />);
    expect(wrapper.container.querySelector('.ant-space')).toHaveClass('test');
  });
});
