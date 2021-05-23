import { act, renderHook } from '@testing-library/react-hooks';
import Mock, { Mockjs } from 'mockjs';

import { MockRules, useMock } from 'super-antd';

const setUp = (initMockRules: MockRules = {}, onMockCallback: (data: any) => void, Mock?: Mockjs) =>
  renderHook(({ initMockRules, onMockCallback }) => useMock({ Mock, initMockRules, onMockCallback }), {
    initialProps: {
      initMockRules,
      onMockCallback,
    },
  });

describe('useMock', () => {
  test('无 Mock 时发出警告', () => {
    const { result } = setUp({ a: '@string' }, () => { });
    let originConsoleWarn = console.warn
    const fn = jest.fn()
    console.warn = fn
    act(() => {
      result.current.setMock()
    })
    expect(fn).toBeCalled()
    console.warn = originConsoleWarn
  })


  test('initMockRules 变化时，mockRules 应该跟随变化', () => {
    // 初始化
    const callback = jest.fn()
    const { result, rerender } = setUp({}, callback);
    expect(result.current.mockRules).toEqual({});
    expect(result.current.hasMockRules).toBeFalsy();

    // 重新更改
    rerender({ initMockRules: { a: '@string' }, onMockCallback: callback });
    expect(result.current.mockRules).toEqual({ a: '@string' });
  });


  test('setMockRule', () => {
    const { result } = setUp({}, () => { });
    act(() => {
      result.current.mockRules.a = '@integer';
    });

    expect(result.current.mockRules).toEqual({ a: '@integer' });
    expect(result.current.hasMockRules).toBeTruthy();
  });

  test('removeMockRule', async () => {
    const { result } = setUp({ a: '@integer' }, () => { });
    expect(result.current.mockRules).toEqual({ a: '@integer' });
    expect(result.current.hasMockRules).toBeTruthy();

    act(() => {
      delete result.current.mockRules.a
    });

    expect(result.current.mockRules).toEqual({});
    expect(result.current.hasMockRules).toBeFalsy();
  });

  test('onMockCallback 应该传递 mock 数据', () => {
    const fn = jest.fn()
    const { result } = setUp({ a: '@integer' }, fn, Mock);
    act(() => {
      result.current.setMock()
    })
    expect(fn).toBeCalledWith({ a: expect.any(Number) })
  })
});