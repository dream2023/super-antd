import { render, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import React, { FC } from 'react';

import { AxiosHooksOptions, useAxios } from '@/shared';
import { SuperProvider } from 'super-antd';

describe('useAxios', () => {
  const Demo: FC<AxiosHooksOptions> = (props) => {
    const { loading, data } = useAxios(props);
    if (loading) return <div data-testid="loading">loading</div>;
    if (!data) return <div data-testid="empty">empty</div>;
    return <div data-testid="data">{JSON.stringify(data)}</div>;
  };

  test('当 api 存在，且 axios 不存在时，应报警告', () => {
    const warn = jest.fn();
    const originWarn = console.warn;
    console.warn = warn;
    renderHook(() => useAxios({ api: '/user' }));
    expect(warn).toBeCalled();
    console.warn = originWarn;
  });

  test('当 api 不存在时，应该 loading 应为 false', () => {
    const wrapper = render(
      <SuperProvider axios={axios}>
        <Demo />
      </SuperProvider>,
    );
    expect(wrapper.queryByTestId('loading')).not.toBeInTheDocument();
    expect(wrapper.getByTestId('empty')).toBeInTheDocument();
  });

  test('正常请求', async () => {
    const api = () => ({ a: 'a' });
    const wrapper = render(
      <SuperProvider axios={axios}>
        <Demo api={api} />
      </SuperProvider>,
    );
    expect(wrapper.getByTestId('loading')).toBeInTheDocument();
    await waitFor(() => {
      expect(wrapper.queryByTestId('data')).toHaveTextContent(JSON.stringify({ a: 'a' }));
    });
  });
});
