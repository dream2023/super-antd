import { useCreation } from 'ahooks';
import type { NamePath } from 'rc-field-form/lib/interface';
import type { ComponentType, FC} from 'react';
import { useContext } from 'react';
import React from 'react';

import { castToArray } from '@/shared';
import { useFormMock } from '../hooks/useFormMock';
import type { SuperFormContextProps } from '@/form';
import { SuperFormContext } from '@/form';

export type WithMockProps<T = any> = T & {
  // 表单项 name
  name?: NamePath;
  // 是否隐藏
  hidden?: boolean;
  // 是否禁用
  disabled?: boolean;
  // 是否只读
  readonly?: boolean
  /** Mock 数据 */
  mock?: any;
};

// 配置项
export interface WithMockConfigType {
  /** Mock 规则 */
  defaultMockRule?: any;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function withMock<P extends object = any>(Component: ComponentType<P>, config: WithMockConfigType = {}) {
  const { defaultMockRule } = config
  const ComponentWithMock: FC<WithMockProps<P>> = (props) => {
    const { hidden, readonly, disabled, mock, name, ...resetOptions } = props;
    // 表单 context
    const formContext = useContext<SuperFormContextProps>(SuperFormContext);

    // 将 name 转为字符串， ['info', 'name'] => 'info.name'
    const nameStr = useCreation<string>(() => {
      return castToArray(name).join('.');
    }, [name]);

    // mock 数据相关
    useFormMock({
      mock,
      formContext,
      disabledMock: !!(readonly || hidden || disabled),
      name: nameStr,
      defaultMockRule,
      props,
    });
    return (
      <Component
        {...(resetOptions as P)}
        name={name}
        readonly={readonly}
        disabled={disabled}
        hidden={hidden}
      />
    );
  };
  return ComponentWithMock;
}
