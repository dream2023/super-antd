import { useMount, usePersistFn } from 'ahooks';
import { Select, Space } from 'antd';
import type { FC, Key } from 'react';
import React, { useState } from 'react';
import warning from 'tiny-warning';

import type { ApiType } from '@/shared';
import { getOptions, useAxios } from '@/shared';
import { __DOCS_URL__ } from '@/shared/src/constants';
import type { OptionsProp } from '@/shared/src/hooks/useOptions/types';

export interface ChainSelectProps {
  value?: Key[];
  options?: ApiType;
  mode?: 'edit' | 'read' | 'update';
  optionsProp?: OptionsProp;
  onChange?: (value: Key[]) => void;
}

export const ChainSelect: FC<ChainSelectProps> = ({ value = [], onChange, options, mode, optionsProp }) => {
  const [optionsList, setOptionsList] = useState<any[]>([[]]);
  const [requestData, setRequestData] = useState<{ level: number; parent_id?: Key }>({
    level: 1,
    parent_id: undefined,
  });
  const { loading, run } = useAxios({
    api: options,
    manual: true,
    fetchKey: (_, params) => {
      return params.level;
    },
    onSuccess: (res, [, params]) => {
      if (Array.isArray(res)) {
        const options = getOptions(res, optionsProp);
        setOptionsList((state) => {
          const res = [...state];
          if (options.length > 0) {
            res.splice(params.level - 1, 1, options);
          } else {
            res.splice(params.level - 1, 1);
          }
          return res;
        });
      } else {
        warning(
          false,
          `[super-antd]: ChainSelect 组件请求 options 数据失败错误，期望数据类型为数组，实际类型为 ${typeof res}，实际数据为 ${JSON.stringify(
            res,
          )}，更多说明见：${__DOCS_URL__}/guide/concept/options`,
        );
      }
    },
  });

  useMount(() => {
    run(
      {},
      {
        level: 1,
      },
    );
    value.forEach((item, index) => {
      run(
        {},
        {
          level: index + 2,
          parent_id: item,
        },
      );
    });
  });

  // 更改数组
  const handleChangeVal = usePersistFn((level: number, val: Key, valueArr: Key[]) => {
    const requestData = {
      level: level + 1,
      parent_id: val,
    };
    setRequestData(requestData);
    run({}, requestData);
    // 清空下一层的 options 选项
    setOptionsList((state) => {
      let res = [...state];
      res = res.slice(0, level);
      res.push([]);
      return res;
    });
    // 清除值
    const res = [...valueArr].slice(0, level);
    res[level - 1] = val;
    if (onChange) {
      onChange(res);
    }
  });

  // 只读模式
  if (mode === 'read') {
    const str = value
      .map((item, index) => {
        const opt = optionsList[index]?.find((option: { value: React.Key }) => option.value === item);
        return opt ? opt.label : item;
      })
      .join(' ');
    return <div>{str}</div>;
  }

  // 编辑模式
  return (
    <Space>
      {optionsList.map((options, index) => (
        // eslint-disable-next-line
        <Select<Key>
          key={String(index)}
          placeholder="请选择"
          value={value[index]}
          loading={loading && requestData.level - 1 === index}
          onChange={(val) => handleChangeVal(index + 1, val, value)}
          options={options}
        ></Select>
      ))}
    </Space>
  );
};
