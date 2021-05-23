import { useCreation } from 'ahooks';
import { useEffect, useRef, useState } from 'react';
import warning from 'tiny-warning';

import { __DOCS_URL__ } from '../../constants';
import { isArray } from '../../utils';
import type { ApiType } from '../useAxios';
import { useAxios } from '../useAxios';
import { getOptions } from './util';
import type { IUseOptions, OptionList } from './types';

export const useOptions = ({
  options,
  optionsProp,
  data,
  hidden,
}: IUseOptions): { options: OptionList; loading: boolean } => {
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

  const hasRequested = useRef(false);
  useEffect(() => {
    if (api && !loading && !hidden) {
      if (!hasRequested.current) {
        run();
        hasRequested.current = true;
      } else {
        refresh();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, data, hidden]);

  // 数组的情况
  useEffect(() => {
    if (isArray(options)) {
      // 数组
      setList(getOptions(options, optionsProp));
    }
  }, [options, optionsProp]);
  return { options: list, loading };
};
