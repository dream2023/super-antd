import { useCreation } from 'ahooks';
import type { FormInstance } from 'antd';
import set from 'lodash.set';
import type { NamePath } from 'rc-field-form/lib/interface';
import type { ComponentType, FC } from 'react';
import React from 'react';
import { useDeepCompareEffect } from 'react-use';

import type { OptionsProp, OptionsType } from '@/shared';
import { useOptions } from '@/shared';

export type WithOptionsProps<T = any> = Omit<T, 'options'> & {
  form?: FormInstance<any>;
  // 表单属性
  data?: Record<string, any>;
  // 表单项 name
  name?: NamePath;
  // 是否隐藏
  hidden?: boolean;
  // options 属性
  options?: OptionsType;
  // options key 映射对象
  optionsProp?: OptionsProp;
  // 当 options 改变后请求值
  clearValueAfterOptionsChange?: boolean;
};

// 配置项
export interface WithOptionsConfigType {
  // 传入的组件是否有 loading 属性
  hasLoadingProp?: boolean;
  // 传入的属性，是否需要将表单的数据透传过去
  needData?: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function withOptions<P extends object = any>(Component: ComponentType<P>, config: WithOptionsConfigType) {
  const ComponentWithOptions: FC<WithOptionsProps<P>> = (props) => {
    const { options, hidden, name, form, optionsProp, data, clearValueAfterOptionsChange, ...resetOptions } = props;
    // 获取到 options
    const {
      options: computedOptions,
      loading,
      requestCount,
    } = useOptions({
      name,
      options,
      hidden,
      optionsProp,
      data,
    });

    // 当 options 改变后是否清空表单项值
    useDeepCompareEffect(() => {
      if (name && form && clearValueAfterOptionsChange && requestCount.current > 1) {
        const obj = set({}, name, undefined);
        form.setFieldsValue(obj);
      }
    }, [computedOptions]);

    // 判断是否有 loading 属性
    const computedLoadingObj = useCreation(() => {
      return config.hasLoadingProp ? { loading: loading || (resetOptions as any).loading } : {};
    }, [loading, (resetOptions as any).loading]);

    // 是否需要 data
    const computedDataProps = useCreation(() => {
      return config.needData ? { data, optionsProp } : {};
    }, [data]);

    return (
      <Component
        {...(resetOptions as P)}
        name={name}
        hidden={hidden}
        options={computedOptions}
        {...computedLoadingObj}
        {...computedDataProps}
      />
    );
  };
  return ComponentWithOptions;
}
