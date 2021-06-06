import type { Key } from 'react';

import { getSchemaData } from '../../utils/dataMapping';
import { isFunction, isNil, isPlainObject } from '../../utils/is';
import type {
  ApiType,
  ErrorCallback,
  ErrorData,
  ErrorNotifyType,
  RequestMessage,
  SuccessCallback,
  SuccessNotifyType,
  SuperAxiosRequestConfig,
} from './types';

/**
 * 将任意类型转为对象
 *
 * @example
 *   castToObj('foo', null); //=> {}
 *   castToObj('foo', 123); // { foo: 123 }
 *   castToObj('foo', { name: 'a' }); // { name: 'a' }
 *
 * @param val 要转化的值
 * @param key 要转化值的 key
 */
export function castToObj(key: string, val?: any): Record<any, any> {
  if (isNil(val)) return {};
  if (typeof val === 'object') return val;
  return { [key]: val };
}

// 将对象的值转为 undefined
export function changeObjValueToUndefined(obj?: Record<Key, any>) {
  if (!obj) return {};
  return Object.keys(obj).reduce((acc: Record<Key, any>, key) => {
    acc[key] = undefined;
    return acc;
  }, {});
}

// 处理响应结果
interface FormatResultOptions {
  api?: ApiType;
  delimiters?: [string, string];
  currentData?: Record<Key, any>;
}
export function processFormatResult<T = any>({ api, currentData = {}, delimiters }: FormatResultOptions) {
  return (response?: T) => {
    // 当 api 为函数类型时，则确定没有 responseSchema，则直接返回
    if (isFunction(api)) return response;

    // 当 api 为其他类型，转为对象
    const { response: responseSchema, replaceData } = castToObj('url', api);
    let data = response;

    // 如果 response 为对象，则需要替换数据
    if (isPlainObject(response) && replaceData) {
      // 当原来对象的值都要转为 undefined
      const changedCurrentData = changeObjValueToUndefined(currentData);
      // 融合两者
      data = { ...changedCurrentData, ...response };
    }

    if (responseSchema) {
      return getSchemaData({ schema: responseSchema, data: isNil(data) ? {} : data, delimiters, defaultValue: 'data' });
    }
    return data;
  };
}

// 处理错误
interface ErrorOptions {
  onErrorNotify?: ErrorNotifyType;
  message?: RequestMessage;
  onError?: ErrorCallback;
}
export function processError({ onErrorNotify, message, onError }: ErrorOptions) {
  return (error: ErrorData, params: any) => {
    // 错误消息提示
    if (onErrorNotify) {
      onErrorNotify(message?.error, error, params);
    }

    // 错误回调
    if (onError) {
      onError(error, params);
    }
  };
}

// 处理成功回调
interface SuccessOptions {
  onSuccessNotify?: SuccessNotifyType;
  message?: RequestMessage;
  onSuccess?: SuccessCallback;
}
export function processSuccess({ onSuccessNotify, message, onSuccess }: SuccessOptions) {
  return (data: any, params: any) => {
    // 成功通知
    if (onSuccessNotify) {
      onSuccessNotify(message?.success, data, params);
    }

    // 成功回调
    if (onSuccess) {
      onSuccess(data, params);
    }
  };
}

/** 获取 axios 配置 主要功能是转化 data 和 params */
interface GetAxiosOptions {
  api?: ApiType;
  contextData?: Record<Key, any>;
  data?: Record<Key, any>;
  params?: Record<Key, any>;
  delimiters?: [string, string];
}

export function getAxiosOptions({ api, contextData = {}, data = {}, params = {}, delimiters }: GetAxiosOptions) {
  const axiosApi = castToObj('url', api);
  const {
    url,
    data: dataSchema,
    params: paramsSchema,
    response: responseSchema,
    ...axiosOptions
  } = axiosApi as SuperAxiosRequestConfig;

  const newUrl = getSchemaData({
    schema: url,
    data: { ...data, ...params, ...contextData },
    delimiters,
    defaultValue: 'schema',
  });
  const dataOption = dataSchema
    ? getSchemaData({ schema: dataSchema, data: { ...data, ...contextData }, delimiters })
    : data;
  const paramsOption = paramsSchema
    ? getSchemaData({ schema: paramsSchema, data: { ...params, ...contextData }, delimiters })
    : params;
  return {
    ...axiosOptions,
    url: newUrl,
    data: Object.keys(dataOption).length ? dataOption : undefined,
    params: Object.keys(paramsOption).length ? paramsOption : undefined,
  };
}

interface ServiceFnOptions {
  api: ApiType;
  contextData?: Record<Key, any>;
  defaultData?: Record<Key, any>;
  defaultParams?: Record<Key, any>;
  delimiters?: [string, string];
}

export function serviceFn({ api, contextData, defaultData, defaultParams, delimiters }: ServiceFnOptions) {
  return (data?: Record<Key, any>, params?: Record<Key, any>, others?: Record<Key, any>) => {
    // 因为 data 和 defaultData 可能为空，所以使用 Object.assign，用解构需要判空
    const dataOption = Object.assign({}, defaultData, data);
    const paramOption = Object.assign({}, defaultParams, params);
    const contextOption = Object.assign({}, contextData, others);

    if (isFunction(api)) {
      const res = api(dataOption, paramOption, contextOption);
      if (res instanceof Promise) return res;

      // 符合 useRequest 返回值
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(res);
        });
      });
    }
    return getAxiosOptions({
      api,
      data: dataOption,
      params: Object.assign({}, defaultParams, params),
      contextData: paramOption,
      delimiters,
    });
  };
}
