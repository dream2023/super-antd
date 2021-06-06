import type { SchemaType } from '@dream2023/data-mapping';
import type { AxiosRequestConfig } from 'axios';
import type { Key } from 'react';

export type AxiosType = (options: any) => Promise<any>;
export type ErrorNotifyType = undefined | ((msg?: string, error?: ErrorData, params?: any) => void);
export type SuccessNotifyType = undefined | ((msg?: string, data?: any, params?: any) => void);

export interface SuperAxiosRequestConfig extends AxiosRequestConfig {
  /** 响应结果转换 */
  response?: SchemaType;
  /** 是否替换原数据 true 为替换，false 为合并 */
  replaceData?: boolean;
  // body 参数
  data?: Record<Key, any> | SchemaType;
  // query 参数
  params?: Record<Key, any> | SchemaType;
}

export type ApiFunction = (data: Record<Key, any>, params: Record<Key, any>, contextData: Record<Key, any>) => any;
export type ApiType = string | SuperAxiosRequestConfig | ApiFunction;

// 请求信息
export interface RequestMessage {
  // 成功时的消息提示
  success?: string;
  // 失败时的消息提示
  error?: string;
}

/**
 * Error 的类型
 *
 * 既支持 Error 对象，也支持 { message: 'xx', errors: {} } 用于表单回显
 */
export type ErrorData = Error & { message?: string; errors?: Record<string, any> };

// 失败回调
export type ErrorCallback = (e: ErrorData, params?: any) => void;

// 成功回调
export type SuccessCallback = (data?: any, params?: any) => void;

export interface AxiosContextProps {
  // axios 实例
  axios?: AxiosType;
  // 自定义错误通知
  errorNotify?: ErrorNotifyType;
  // 自定义请求成功通知
  successNotify?: SuccessNotifyType;
}
