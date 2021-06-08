import React, { FC } from 'react';
import type { ComponentType } from 'react';
import type { ComponentDecoratorType, SchemaParserType } from 'react-schema-render';

/**
 * Error 的类型
 *
 * 既支持 Error 对象，也支持 { message: 'xx', errors: {} } 用于表单回显
 */
export type ErrorData = Error & { message?: string; errors?: Record<string, any> };

export interface ISuperProviderProps {
  /** 组件默认属性 */
  componentProps?: Record<string, Record<any, any>>;
  /** 分隔符 */
  delimiters?: [string, string];
  /** 自定义过滤器 */
  filters?: Record<string, Function>;

  /** Axios 实例 */
  axios?: (options: any) => Promise<any>;
  /** 自定义错误通知 */
  errorNotify?: (msg?: string, error?: ErrorData, params?: any) => void;
  /** 自定义请求成功通知 */
  successNotify?: (msg?: string, data?: any, params?: any) => void;

  /**
   * 组件映射列表，同 react-schema-render
   *
   * @see https://dream2023.gitee.io/react-schema-render/
   */
  components?: Record<string, ComponentType<any>>;
  /**
   * 自定义装饰器
   *
   * @see https://dream2023.gitee.io/react-schema-render/decorator
   */
  componentDecorator?: ComponentDecoratorType;
  /**
   * 自定义解析器
   *
   * @see https://dream2023.gitee.io/react-schema-render/parser
   */
  parsers?: SchemaParserType[];
}

const Demo: FC<ISuperProviderProps> = () => <>Demo!</>;

export default Demo;
