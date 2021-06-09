import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import React, { FC, useState } from 'react';

import { ApiType, IUseOptions, SuperProvider, useOptions } from 'super-antd';

describe('useOptions', () => {
  describe('options 为数组', () => {
    const setup = (config: IUseOptions) => renderHook(() => useOptions(config));
    test('options 为数组', () => {
      const { result } = setup({ options: ['a', 'b'] });
      expect(result.current.loading).toBe(false);
      expect(result.current.options).toEqual([
        { label: 'a', value: 'a' },
        { label: 'b', value: 'b' },
      ]);
    });

    test('optionsProp 存在', () => {
      const { result } = setup({
        options: [
          { name: 'a', id: 1 },
          { name: 'b', id: 2 },
        ],
        optionsProp: { labelKey: 'name', valueKey: 'id' },
      });
      expect(result.current.loading).toBe(false);
      expect(result.current.options).toEqual([
        { label: 'a', value: 1 },
        { label: 'b', value: 2 },
      ]);
    });
  });

  describe('options 为 API', () => {
    const Demo: FC<{ api: ApiType; hidden?: boolean; data?: object }> = ({ api, hidden, data }) => {
      const { options, loading } = useOptions({
        options: api,
        hidden,
        data,
      });

      return (
        <div>
          <div data-testid="loading">{loading ? 'true' : 'false'}</div>
          <div data-testid="options">{JSON.stringify(options)}</div>
        </div>
      );
    };

    test('正常请求', async () => {
      const api = async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            return resolve(['a', 'b']);
          });
        });
      };

      render(
        <SuperProvider axios={axios}>
          <Demo api={api} />
        </SuperProvider>,
      );
      expect(screen.getByTestId('loading').textContent).toBe('true');
      expect(screen.getByTestId('options').textContent).toBe('[]');

      await waitFor(
        () => {
          expect(screen.getByTestId('loading').textContent).toBe('false');
          expect(screen.getByTestId('options').textContent).toBe(
            JSON.stringify([
              { label: 'a', value: 'a' },
              { label: 'b', value: 'b' },
            ]),
          );
        },
        { timeout: 1000 },
      );
    });

    test('返回不为数组时，应发出警告', async () => {
      const fn = jest.fn();
      const originWarn = console.warn;
      console.warn = fn;
      const api = async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            return resolve({});
          });
        });
      };

      render(
        <SuperProvider axios={axios}>
          <Demo api={api} />
        </SuperProvider>,
      );
      expect(screen.getByTestId('loading').textContent).toBe('true');
      expect(screen.getByTestId('options').textContent).toBe('[]');

      await waitFor(() => {
        expect(fn).toBeCalled();
        expect(screen.getByTestId('loading').textContent).toBe('false');
        expect(screen.getByTestId('options').textContent).toBe('[]');
      });

      console.warn = originWarn;
    });

    test('当 hidden 为 true 时，不请求', async () => {
      const api = async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            return resolve(['a', 'b']);
          });
        });
      };

      render(
        <SuperProvider axios={axios}>
          <Demo api={api} hidden />
        </SuperProvider>,
      );

      expect(screen.getByTestId('loading').textContent).toBe('false');
      expect(screen.getByTestId('options').textContent).toBe('[]');
    });

    test('当依赖项发生时，重新请求', async () => {
      const api = async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            return resolve(['a', 'b']);
          });
        });
      };

      const App = () => {
        const [data, setData] = useState({});
        return (
          <SuperProvider axios={axios}>
            <Demo api={api} data={data} />
            <button onClick={() => setData({ a: 'a' })} data-testid="setData">
              更改 data
            </button>
          </SuperProvider>
        );
      };
      render(<App />);

      expect(screen.getByTestId('loading').textContent).toBe('true');

      await waitFor(() => {
        expect(screen.getByTestId('loading').textContent).toBe('false');
      });

      fireEvent.click(screen.getByTestId('setData'));
      await waitFor(() => {
        expect(screen.getByTestId('loading').textContent).toBe('true');
      });
    });
  });
});
