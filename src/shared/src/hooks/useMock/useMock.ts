import { useCreation, usePersistFn, useReactive } from 'ahooks';
import { useContext } from 'react';
import warning from 'tiny-warning';

import { SuperAntdContext } from '@/provider';

import { __DOCS_URL__ } from '../../constants';
import type { MockRules } from './types';
import { getMockValues } from './util';

/**
 * Mock 数据
 *
 * @param initMockRules Mock 初始规则，当为 boolean，可以理解为 {}，主要为支持外部的
 * @param onMockCallback 当 mock 时的回调函数
 */
export function useMock<T = any>(initMockRules: MockRules, onMockCallback?: (data: T) => void) {
  const context = useContext(SuperAntdContext);
  const mockRules = useReactive<MockRules>(initMockRules);

  // // 当 initMockRules 发生变化时，需要更新 mockRules
  // useEffect(() => {
  //   Object.assign(mockRules, initMockRules);
  // }, [initMockRules]);

  // 是否有 MockRules
  const hasMockRules = useCreation(() => {
    return Object.keys(mockRules).length > 0;
  }, [Object.keys(mockRules)]);

  // 回调函数
  const setMock = usePersistFn(() => {
    const Mock = context.mockjs;
    // 参数校检
    if (!Mock) {
      warning(
        Mock,
        `要想使用 Mock 数据功能，请先设置 mockjs，具体方法参见：${__DOCS_URL__}/guide/concept/config#mock-%E6%95%B0%E6%8D%AE`,
      );
      return;
    }

    // 如果有回调函数，就执行
    if (onMockCallback) {
      onMockCallback(getMockValues(Mock, mockRules));
    }
  });

  return {
    setMock,
    mockRules,
    hasMockRules,
  };
}

export default useMock;
