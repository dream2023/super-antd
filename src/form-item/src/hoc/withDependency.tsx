import type { FormInstance } from '@ant-design/pro-form';
import { ProFormDependency } from '@ant-design/pro-form';
import { useCreation } from 'ahooks';
import type { FC, Key } from 'react';
import React from 'react';

import { castToArray } from '@/shared';

import { getName } from '../utils';

// 内部注入的属性，不能由外部传入
export interface InjectedDependencyProps {
  // 表单数据
  data: Record<Key, any>;
  // 表单实例
  form: FormInstance;
}

export interface NewDependencyProps {
  // 联动字段
  linkageFields?: string | string[];
}

// 联动所需要的属性
export type WithDependencyProps<T> = Omit<T, keyof InjectedDependencyProps> & NewDependencyProps;

/**
 * 用于表单项联动的高阶组件
 *
 * @example
 *   // 原始类型
 *   interface FooProps {
 *     test: string;
 *   }
 *
 *   // 原始组件
 *   const Foo: FC<FooProps> = () => <div></div>;
 *
 *   // 增强组件
 *   const SuperFoo = withDependency<FooProps>(Foo);
 *
 *   // 使用
 *   <SuperFoo test="ss"></SuperFoo>;
 *
 * @param FormItemComponent 表单项组件
 */
export function withDependency<P extends InjectedDependencyProps>(FormItemComponent: React.ComponentType<P>) {
  // 类型中，需要去除内部注入的属性
  const WithDependencyFormItem: FC<WithDependencyProps<P>> = (props) => {
    const { linkageFields } = props;

    // 获取联动字段
    const compuntedLinkageFields = useCreation(() => {
      return castToArray(linkageFields).map((name) => getName(name)!);
    }, [linkageFields]);

    return (
      <ProFormDependency name={compuntedLinkageFields}>
        {(data, form) => (
          // 注入 data 和 form 属性
          <FormItemComponent {...(props as P)} data={data} form={form} linkageFields={compuntedLinkageFields} />
        )}
      </ProFormDependency>
    );
  };

  return WithDependencyFormItem;
}
