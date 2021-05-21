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
 *   castToObj(null); //=> {}
 *   castToObj({ name: '123' }, 'data', true); // => {data: {name: '123'}}
 *   castToObj({ name: '123' }, 'data'); // { name: '123' }
 *
 * @param val 要转化的值
 * @param key 要转化值的 key
 * @param forceSetKey 当为对象时，是否强制设置 key
 */
export function castToObj(val?: any, key?: string, forceSetKey?: boolean) {
  if (isNil(val)) return {};
  if (val instanceof Object) return key && forceSetKey ? { [key]: val } : val;
  return { [key || val]: val };
}

export function changeObjToUndefined(obj?: Record<Key, any>) {
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
  return (response: T) => {
    if (isFunction(api)) return response;
    const { response: responseSchema, replaceData } = castToObj(api, 'url');
    let data = response;
    if (isPlainObject(response) && replaceData) {
      const changedCurrentData =
        replaceData && isPlainObject(response) ? changeObjToUndefined(currentData) : currentData;
      data = { ...changedCurrentData, ...response };
    }

    return responseSchema ? getSchemaData({ schema: responseSchema, data, delimiters, defaultValue: 'data' }) : data;
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
  contextData: Record<Key, any>;
  data: Record<Key, any>;
  params: Record<Key, any>;
  delimiters?: [string, string];
}

export function getAxiosOptions({ api, contextData, data, params, delimiters }: GetAxiosOptions) {
  const axiosApi = castToObj(api, 'url');
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

export function serviceFn({
  api,
  contextData = {},
  defaultData = {},
  defaultParams = {},
  delimiters,
}: ServiceFnOptions) {
  return (data: Record<Key, any> = {}, params: Record<Key, any> = {}, others: Record<Key, any> = {}) => {
    if (isFunction(api)) {
      return api(data, params, { contextData, ...others });
    }
    return getAxiosOptions({
      api,
      contextData: { ...contextData, ...others },
      data: { ...defaultData, ...data },
      params: { ...defaultParams, ...params },
      delimiters,
    });
  };
}
