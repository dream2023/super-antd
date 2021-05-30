import React, { useContext } from 'react';
import { render } from '@testing-library/react'
import { SuperAntdContext, SuperProvider } from 'super-antd'
import { getFilters, setFilters } from '@dream2023/data-mapping';
import axios from 'axios';
import mockjs from 'mockjs';

describe('SuperProvider', () => {
  test('children 可以正常显示', () => {
    const warpper = render(<SuperProvider><div data-testid="content">hello world</div></SuperProvider>)
    expect(warpper.getByTestId('content')).toBeInTheDocument()
  })

  test('过滤器 filters', () => {
    const filters = {
      getFoo: () => 'foo'
    }
    render(<SuperProvider filters={filters}></SuperProvider>)
    expect(getFilters()).toBe(getFilters())
  })

  test('axios 相关', () => {
    const Demo = () => {
      const { axios } = useContext(SuperAntdContext)
      return <div data-testid="axios">
        { axios ? 'have' : 'empty' }
      </div>
    }

    const warpper = render(<SuperProvider axios={axios}><Demo /></SuperProvider>)
    expect(warpper.getByTestId('axios')).toHaveTextContent('have')
  })

  test('mockjs', () => {
    const Demo = () => {
      const { mockjs } = useContext(SuperAntdContext)
      return <div data-testid="mockjs">
        { mockjs ? 'have' : 'empty' }
      </div>
    }

    const warpper = render(<SuperProvider mockjs={mockjs}><Demo /></SuperProvider>)
    expect(warpper.getByTestId('mockjs')).toHaveTextContent('have')
  })
});