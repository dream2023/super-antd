import { fireEvent, render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import React, { useState } from 'react';
import { BrowserRouter, HashRouter, Route, Switch, useHistory, useLocation } from 'react-router-dom';

import { useJump } from '@/shared';

describe('useJump', () => {
  describe('use jump by window.open', () => {
    test('当为 url 为 string 类型时，应该采用 window.open 默认参数', () => {
      const { result } = renderHook(() => useJump());
      const fn = jest.fn();
      window.open = fn;
      act(() => {
        result.current('https://www.baidu.com');
      });
      expect(fn).toBeCalledWith('https://www.baidu.com', '_self', undefined, undefined);
    });

    test('当为 url 为对象类型时，则根据对象类型跳转', () => {
      const { result } = renderHook(() => useJump());
      const fn = jest.fn();
      window.open = fn;
      act(() => {
        result.current({ url: 'https://www.baidu.com', target: '_blank' });
      });
      expect(fn).toBeCalledWith('https://www.baidu.com', '_blank', undefined, undefined);
    });
  });

  describe('should jump by useHistory', () => {
    const Demo = () => {
      const jump = useJump();
      const location = useLocation();
      const history = useHistory();
      const [len, setLen] = useState(0);
      React.useEffect(() => {
        setLen(history.length);
      }, [location]);
      return (
        <>
          <div data-testid="len">{len}</div>
          <button onClick={() => jump('/user')} data-testid="jump">
            jump
          </button>
          <Switch>
            <Route exact path="/">
              home
            </Route>
            <Route exact path="/user">
              user
            </Route>
          </Switch>
        </>
      );
    };

    test('无 RouterRouter', () => {
      expect.assertions(1);
      const { result } = renderHook(() => useJump());
      act(() => {
        expect(() => result.current('/user')).toThrowError();
      });
    });

    test('base BrowserRouter', async () => {
      render(
        <BrowserRouter>
          <Demo />
        </BrowserRouter>,
      );
      const len = Number(screen.getByTestId('len').textContent);
      expect(screen.queryByText('home')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('jump'));
      expect(screen.queryByText('user')).toBeInTheDocument();
      expect(screen.getByTestId('len')).toHaveTextContent(String(len + 1));
    });

    test('base HashRouter', () => {
      render(
        <HashRouter>
          <Demo />
        </HashRouter>,
      );
      const len = Number(screen.getByTestId('len').textContent);
      expect(screen.queryByText('home')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('jump'));
      expect(screen.queryByText('user')).toBeInTheDocument();
      expect(screen.getByTestId('len')).toHaveTextContent(String(len + 1));
    });

    test('当传入 replace 参数应该调用 history replace', () => {
      const Demo = () => {
        const jump = useJump();
        const location = useLocation();
        const history = useHistory();
        const [len, setLen] = useState(0);
        React.useEffect(() => {
          setLen(history.length);
        }, [location]);
        return (
          <>
            <div data-testid="len">{len}</div>
            <button onClick={() => jump({ url: '/user', replace: true })} data-testid="jump">
              jump
            </button>
            <Switch>
              <Route exact path="/">
                home
              </Route>
              <Route exact path="/user">
                user
              </Route>
            </Switch>
          </>
        );
      };
      render(
        <BrowserRouter>
          <Demo />
        </BrowserRouter>,
      );
      const len = screen.getByTestId('len').textContent || '';
      fireEvent.click(screen.getByTestId('jump'));
      expect(screen.getByTestId('len')).toHaveTextContent(len);
    });
  });
});
