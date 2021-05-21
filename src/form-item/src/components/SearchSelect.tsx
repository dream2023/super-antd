import { ProFormSelect } from '@ant-design/pro-form';
import type { ProFormSelectProps } from '@ant-design/pro-form/lib/components/Select';
import { useCreation } from 'ahooks';
import type { FC } from 'react';
import React from 'react';

import type { ApiType, OptionsProp } from '@/shared';
import { getOptions, useAxios } from '@/shared';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItemWithOptions } from '../createSuperFormItem';

export type BasicSuperSearchSelectProps = Omit<ProFormSelectProps, 'request'> & {
  data: Record<string, any>;
  request?: ApiType;
  optionsProp?: OptionsProp;
};

const defaultFieldProps = { labelInValue: false };
const BasicSuperSearchSelect: FC<BasicSuperSearchSelectProps> = (props) => {
  const { fieldProps, data, optionsProp, request, ...resetProps } = props;
  // 增加默认值
  const computedFieldProps = useCreation(() => {
    return { ...defaultFieldProps, ...fieldProps };
  }, [props.fieldProps]);

  // 获取搜索结果
  const { run } = useAxios({ api: request, manual: true });

  return (
    <ProFormSelect.SearchSelect
      {...resetProps}
      fieldProps={computedFieldProps}
      request={async ({ keyWords }) => {
        try {
          const res = await run({}, { keyWords });
          return getOptions(res, optionsProp);
        } catch {
          return [];
        }
      }}
    />
  );
};

export type SuperSearchSelectProps = CreateSuperFormItemProps<BasicSuperSearchSelectProps>;
export const SuperSearchSelect = createSuperFormItemWithOptions<BasicSuperSearchSelectProps>(BasicSuperSearchSelect, {
  placeholderPrefix: '请选择',
  needData: true,
});
SuperSearchSelect.displayName = 'SuperSearchSelect';

export default SuperSearchSelect;
