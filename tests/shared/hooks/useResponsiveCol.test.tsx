import { renderHook } from '@testing-library/react-hooks';

import { ResponsiveColOptions, useResponsiveCol } from 'super-antd';

const setup = (options: ResponsiveColOptions) => renderHook(() => useResponsiveCol(options));

// 因为 node 环境下，无法实现 useRef，所以动态变化的无法测试，后面可以使用 e2e 测试
describe('useResponsiveCol', () => {
  describe('shouldResponsive', () => {
    test('默认情况为 true', () => {
      const { result } = setup({});
      expect(result.current.shouldResponsive).toBeTruthy();
    });
    test('isResponsive 为 false，则为 false', () => {
      const { result } = setup({ isResponsive: false });
      expect(result.current.shouldResponsive).toBeFalsy();
    });

    test('itemCount > 1，则为 false', () => {
      const { result } = setup({ itemCount: 2 });
      expect(result.current.shouldResponsive).toBeFalsy();
    });

    test('labelCol 为存在，则为 false', () => {
      const { result } = setup({ labelCol: 9 });
      expect(result.current.shouldResponsive).toBeFalsy();
    });
    test('wrapperCol 为存在，则为 false', () => {
      const { result } = setup({ wrapperCol: 9 });
      expect(result.current.shouldResponsive).toBeFalsy();
    });
    test('layout 非 horizontal，则为 false', () => {
      const { result } = setup({ layout: 'inline' });
      expect(result.current.shouldResponsive).toBeFalsy();
    });
    test('align 非 left，则为 false', () => {
      const { result } = setup({ align: 'center' });
      expect(result.current.shouldResponsive).toBeFalsy();
    });
  });

  describe('responsiveRef', () => {
    test('当 shouldResponsive 为 true 时，应为 ref', () => {
      const { result } = setup({});
      expect(result.current.shouldResponsive).toBeTruthy();
      expect(result.current.responsiveRef).toEqual({ current: null });
    });

    test('当 shouldResponsive 为 false 时，应为 null', () => {
      const { result } = setup({ isResponsive: false });
      expect(result.current.shouldResponsive).toBeFalsy();
      expect(result.current.responsiveRef).toEqual(null);
    });
  });

  describe('responsiveLabelCol', () => {
    test('当 labelCol 参数存在时，应返回 labelCol 的值', () => {
      const { result } = setup({ labelCol: 9 });
      expect(result.current.responsiveLabelCol).toEqual({ span: 9 });
    });

    test('当 hideLabel 参数存在时，应返回 { span: 0 }', () => {
      const { result } = setup({ hideLabel: true, labelCol: 9 });
      expect(result.current.responsiveLabelCol).toEqual({ span: 0 });
    });
  });

  describe('responsiveWrapperCol', () => {
    test('当 wrapperCol 参数存在时，应返回 wrapperCol 的值', () => {
      const { result } = setup({ wrapperCol: 9 });
      expect(result.current.responsiveWrapperCol).toEqual({ span: 9 });
    });
  });
});
