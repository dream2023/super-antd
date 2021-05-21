import type { BaseOptions } from '@ahooksjs/use-request/lib/types';
import { useCreation, useRequest } from 'ahooks';
import { notification } from 'antd';
import type { Key } from 'react';
import { useContext } from 'react';
import warning from 'tiny-warning';

import { SuperAntdContext } from '@/provider';

import { __DOCS_URL__ } from '../../constants';
import { isBoolean } from '../../utils';
import type {
  ApiType,
  ErrorCallback,
  ErrorNotifyType,
  RequestMessage,
  SuccessCallback,
  SuccessNotifyType,
} from './types';
import { processError, processFormatResult, processSuccess, serviceFn } from './util';

// 成功的通知
const defaultSuccessNotify: SuccessNotifyType = (message) => {
  if (message) {
    notification.success({
      message: '系统消息',
      description: message,
    });
  }
};

// 失败的通知
const defaultErrorNotify: ErrorNotifyType = (message, error) => {
  notification.error({
    message: '系统消息',
    description: message || error?.message,
  });
};

export interface AxiosHooksOptions extends BaseOptions<any, any> {
  /** 请求地址对象或者字符串 */
  api?: ApiType;
  /** 请求结果统一提示信息 */
  message?: RequestMessage;
  /** 请求失败的回调 */
  onError?: ErrorCallback;
  /** 请求成功的回调 */
  onSuccess?: SuccessCallback;
  /** 当前数据 */
  currentData?: Record<Key, any>;
  /** 请求参数 */
  params?: Record<Key, any>;
  /** 请求数据 */
  data?: Record<Key, any>;
  /** 当前作用域数据，仅用于数据映射用 它与 data、params 区别是不参与请求 它与 currentData 区别是不在于数据结果处理 */
  contextData?: Record<Key, any>;
}

export function useAxios({
  api = '',
  data: defaultData = {},
  params: defaultParams = {},
  manual,
  message,
  onError,
  onSuccess,
  contextData,
  currentData,
  ...options
}: AxiosHooksOptions) {
  const context = useContext(SuperAntdContext);
  // 获取配置
  const { axios } = context;
  const onErrorNotify: ErrorNotifyType = context.errorNotify || defaultErrorNotify;
  const onSuccessNotify: SuccessNotifyType = context.successNotify || defaultSuccessNotify;

  if (api) {
    warning(
      axios,
      `[super-antd]：如要使用请求数据功能，请先配置 axios，具体方法请看：${__DOCS_URL__}/guide/concept/api`,
    );
  }

  /** 是否为手动请求 如果传递了 manual， 则使用传递的值 否则，当没有 api 时，则也是手动 */
  const isManual = useCreation(() => {
    if (isBoolean(manual)) return manual;
    return !api;
  }, [manual, !api]);

  const request = useRequest(
    serviceFn({ api, contextData, defaultData, defaultParams, delimiters: context.delimiters }),
    {
      manual: isManual,
      throwOnError: true,
      requestMethod: axios,
      formatResult: processFormatResult({ api, currentData, delimiters: context.delimiters }),
      onError: processError({ message, onErrorNotify, onError }),
      onSuccess: processSuccess({ message, onSuccessNotify, onSuccess }),
      // 其他选项
      ...options,
    },
  );

  return request;
}

export default useAxios;
