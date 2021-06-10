import { useCreation } from 'ahooks';
import set from 'lodash.set';
import { useEffect, useRef, useState } from 'react';
import { useDeepCompareEffect } from 'react-use';
import rfdc from 'rfdc';
import warning from 'tiny-warning';

import { __DOCS_URL__ } from '../../constants';
import { isArray } from '../../utils';
import type { ApiType } from '../useAxios';
import { useAxios } from '../useAxios';
import type { IUseOptions, OptionList } from './types';
import { getOptions } from './util';

const clone = rfdc();

export const useOptions = ({
  name,
  options,
  optionsProp,
  data,
  hidden,
}: IUseOptions): {
  options: OptionList;
  loading: boolean;
  requestCount: React.MutableRefObject<number>;
} => {
  const [list, setList] = useState<OptionList>([]);

  // api 的情况
  const api: ApiType | undefined = useCreation(() => (isArray(options) ? '' : options), [options]);
  const { loading, refresh, run } = useAxios({
    api,
    contextData: data,
    manual: true,
    onSuccess: (res) => {
      if (isArray(res)) {
        setList(getOptions(res, optionsProp));
      } else {
        warning(
          false,
          `[super-antd]: ${JSON.stringify(
            api,
          )} 请求 options 数据失败错误，期望数据类型为数组，实际类型为 ${typeof res}，实际数据为 ${JSON.stringify(
            data,
          )}，更多说明见：${__DOCS_URL__}/guide/concept/options`,
        );
      }
    },
  });

  const otherData = useCreation(() => {
    if (!name) return data;
    // eslint-disable-next-line @typescript-eslint/ban-types
    return set(clone(data as object), name, undefined);
  }, [data]);

  const requestCount = useRef(0);
  useDeepCompareEffect(() => {
    if (api && !loading && !hidden) {
      if (requestCount.current === 0) {
        run();
      } else {
        refresh();
      }
      requestCount.current += 1;
    }
  }, [otherData]);

  // 数组的情况
  useEffect(() => {
    if (isArray(options)) {
      // 数组
      setList(getOptions(options, optionsProp));
      requestCount.current += 1;
    }
  }, [options, optionsProp]);

  return { options: list, loading, requestCount };
};
