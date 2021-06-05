import { useCreation, usePersistFn, useReactive, useUpdateLayoutEffect } from 'ahooks';
import warning from 'tiny-warning';

import { __DOCS_URL__ } from '../../constants';
import type { MockRules } from './types';
import { getMockValues } from './util';
import type { Mockjs } from 'mockjs';

/**
 * Mock 数据
 *
 * @param initMockRules Mock 初始规则，当为 boolean，可以理解为 {}，主要为支持外部的
 * @param onMockCallback 当 mock 时的回调函数
 */
interface IUseMockOptions<T = any> {
  initMockRules: MockRules;
  onMockCallback: (data: T) => void;
  Mock?: Mockjs
}

export function useMock<T = any>(options: IUseMockOptions<T>) {
  const { Mock, initMockRules, onMockCallback } = options
  const mockRules = useReactive<MockRules>(initMockRules);

  // 当 initMockRules 发生变化时，需要更新 mockRules
  useUpdateLayoutEffect(() => {
    Object.assign(mockRules, initMockRules)
  }, [initMockRules, mockRules]);

  // 是否有 MockRules
  const hasMockRules = useCreation(() => {
    return Object.keys(mockRules).length > 0
  }, [Object.keys(mockRules)])

  // 回调函数
  const setMock = usePersistFn(() => {
    // 参数校检
    if (!Mock) {
      warning(
        Mock,
        `要想使用 Mock 数据功能，请先设置 mockjs，具体方法参见：${__DOCS_URL__}/guide/concept/config#mock-%E6%95%B0%E6%8D%AE`,
      );
      return;
    }

    onMockCallback(getMockValues<T>(Mock, mockRules));
  });

  return {
    setMock,
    mockRules,
    hasMockRules,
  };
}

export default useMock;
