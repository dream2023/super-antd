/* eslint-disable no-param-reassign */
import { useCreation, useUnmount } from 'ahooks';
import type { Key } from 'react';
import { useEffect } from 'react';

import type { SuperFormContextProps } from '@/form';
import { isBoolean, isFunction } from '@/shared';

export const getMockRule = (mockRule: any, props: Record<Key, any>) => {
  return isFunction(mockRule) ? mockRule(props) : mockRule;
};

export interface FormMockOptions {
  name?: string;
  mock?: any;
  disabledMock?: boolean;
  defaultMockRule?: any;
  formContext: SuperFormContextProps;
  props: Record<Key, any>;
}

export function useFormMock({ name, mock, disabledMock, defaultMockRule, formContext, props }: FormMockOptions) {
  // 是否开启 mock
  const isMock = useCreation(() => {
    if (!name || disabledMock) return false // 如果 name 不存在，则无 key，所以返回 false
    if (formContext.isMock) return true // 代表整个表单都开启 Mock
    return !!mock // 自身 mock 有值，且无 disabled
  }, [name, mock, disabledMock, formContext.isMock]);

  // 自身规则
  const selfMockRule = useCreation(() => {
    return mock && !isBoolean(mock) ? mock : undefined;
  }, [mock]);

  // 获取 mockRule
  const mockRule = useCreation(() => {
    // 如果自身规则存在，则返回自身规则
    if (selfMockRule) {
      // 自身
      return getMockRule(selfMockRule, props)
    }

    if (defaultMockRule) {
      // 否则返回默认规则
      return getMockRule(defaultMockRule, props)
    }

    return undefined
  }, [Object.values(props), mock, defaultMockRule, formContext]);

  useEffect(() => {
    if (!name) return
    if (isMock) {
      formContext.mockRules[name] = mockRule;
    } else {
      delete formContext.mockRules[name];
    }
  }, [formContext.mockRules, isMock, mockRule, name]);

  // 卸载组件时，需要删除 mock
  useUnmount(() => {
    if (isMock && name) {
      delete formContext.mockRules[name];
    }
  });
}
