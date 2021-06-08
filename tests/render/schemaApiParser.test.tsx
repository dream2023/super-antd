import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';

import { SchemaApiToComponent, SuperProvider, schemaApiParser } from 'super-antd';

describe('schemaApiParser', () => {
  describe('SchemaApiToComponent', () => {
    test('正常请求，应先 loading，后显示组件', async () => {
      const api = () => ({ component: 'div', 'data-testid': 'data', children: 'hello world' });
      const warpper = render(
        <SuperProvider axios={axios}>
          <SchemaApiToComponent api={api} />
        </SuperProvider>,
      );
      expect(warpper.container.querySelector('.ant-skeleton')).not.toBeNull();

      await waitFor(() => {
        expect(warpper.queryByTestId('data')).toBeInTheDocument();
      });
    });
    test('无数据时，应返回为空', () => {
      const warpper = render(
        <SuperProvider axios={axios}>
          <SchemaApiToComponent />
        </SuperProvider>,
      );
      expect(warpper.baseElement.innerHTML).toEqual('<div></div>');
    });
    test('当请求结果类型错误时，应警告', async () => {
      const warn = jest.fn();
      const originWarn = console.warn;
      console.warn = warn;

      const api = () => '123';
      const warpper = render(
        <SuperProvider axios={axios}>
          <SchemaApiToComponent api={api} />
        </SuperProvider>,
      );

      await waitFor(() => {
        expect(warpper.container.querySelector('.ant-skeleton')).toBeNull();
      });

      expect(warn).toBeCalled();
      console.warn = originWarn;
    });
  });

  describe('schemaApiParser', () => {
    test('存在 schemaApi，则应该赋值到 children 上', () => {
      const schemaApi = () => ({ component: 'div' });
      expect(schemaApiParser({ schemaApi, a: 'a' })).toEqual({
        a: 'a',
        children: <SchemaApiToComponent api={schemaApi} />,
      });
    });

    test('不存在 schemaApi，则数据不变', () => {
      expect(schemaApiParser({ a: 'a' })).toEqual({ a: 'a' });
    });
  });
});
