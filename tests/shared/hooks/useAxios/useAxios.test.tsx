import React, { FC } from 'react'
import { render, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { AxiosHooksOptions, useAxios, SuperProvider } from 'super-antd'
import axios from 'axios';

const Demo: FC<AxiosHooksOptions> = (props) => {
  const { loading, data } = useAxios(props)
  if (loading) return <div data-testid="loading">loading</div>
  if (!data) return <div data-testid="empty">empty</div>
  return <div data-testid="data">{ JSON.stringify(data) }</div>
}

describe('useAxios', () => {
  test('当 api 存在，且 axios 不存在时，应报警告', () => {
    const warn = jest.fn()
    const originWarn = console.warn
    console.warn = warn
    renderHook(() => useAxios({ api: '/user' }))
    expect(warn).toBeCalled()
    console.warn = originWarn
  })

  test('当 api 不存在时，应该 loading 应为 false', () => {
    const warpper = render(<SuperProvider axios={axios}><Demo  /></SuperProvider>)
    expect(warpper.queryByTestId('loading')).not.toBeInTheDocument()
    expect(warpper.getByTestId('empty')).toBeInTheDocument()
  })

  test('正常请求', async () => {
    const api = () => ({ a: 'a' })
    const warpper = render(<SuperProvider axios={axios}><Demo api={api} /></SuperProvider>)
    expect(warpper.getByTestId('loading')).toBeInTheDocument()
    await waitFor(() => {
      expect(warpper.queryByTestId('data')).toHaveTextContent(JSON.stringify({ a: 'a' }))
    })
  })
});