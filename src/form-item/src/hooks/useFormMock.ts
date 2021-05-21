import { useCreation, useUnmount } from 'ahooks';
import type { Key } from 'react';
import { useEffect } from 'react';

import type { SuperFormContextProps } from '@/form';
import { isBoolean, isFunction } from '@/shared';

const getMockRule = (mockRule: any, props: Record<Key, any>) => {
  return isFunction(mockRule) ? mockRule(props) : mockRule;
};

interface FormMockOptions {
  name?: string;
  mock?: any;
  disabledMock?: boolean;
  defaultMockRule?: any;
  formContext: SuperFormContextProps;
  props: Record<Key, any>;
}

export function useFormMock({ name, mock, disabledMock, defaultMockRule, formContext, props }: FormMockOptions) {
  // 自身是否开启 mock
  const selfIsMock = useCreation(() => {
    // 存在
    return !!mock && !disabledMock;
  }, [mock]);

  // 表单是否开启 mock
  const formIsMock = useCreation(() => {
    return formContext.isMock === true;
  }, [formContext.isMock]);

  // 是否开启 mock
  const isMock = useCreation(() => {
    return name && (selfIsMock || formIsMock);
  }, [selfIsMock, formIsMock]);

  // 自身规则
  const selfMockRule = useCreation(() => {
    return mock && !isBoolean(mock) ? mock : undefined;
  }, []);

  // 获取 mockRule
  const mockRule = useCreation(() => {
    // 如果自身规则存在，则返回自身规则
    if (selfMockRule) return getMockRule(selfMockRule, props);
    // form 级别的
    if (formContext.mockRules && name && formContext.mockRules[name]) return formContext.mockRules[name];
    // 否则返回默认规则
    if (defaultMockRule) return getMockRule(defaultMockRule, props);

    return undefined;
  }, [props, mock, defaultMockRule, formContext]);

  useEffect(() => {
    if (isMock) {
      // eslint-disable-next-line no-param-reassign
      formContext.mockRules[name!] = mockRule;
    } else {
      // eslint-disable-next-line no-param-reassign
      delete formContext.mockRules[name!];
    }
  }, [formContext.mockRules, isMock, mockRule, name]);

  // 卸载组件时，需要删除 mock
  useUnmount(() => {
    if (isMock) {
      // eslint-disable-next-line no-param-reassign
      delete formContext.mockRules[name!];
    }
  });
}
