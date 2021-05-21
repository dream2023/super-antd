import { useCreation } from 'ahooks';
import type { FC } from 'react';
import React from 'react';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import type { SuperRadioGroupProps } from './RadioGroup';
import { SuperRadioGroup } from './RadioGroup';

export type SuperRadioButtonProps = CreateSuperFormItemProps<Omit<SuperRadioGroupProps, 'radioType'>>;
export const SuperRadioButton: FC<Omit<SuperRadioGroupProps, 'radioType'>> = ({ fieldProps, ...resetProps }) => {
  const computedFieldProps = useCreation(() => {
    return { buttonStyle: 'solid' as const, ...(fieldProps || {}) };
  }, [fieldProps]);

  return <SuperRadioGroup {...resetProps} radioType="button" fieldProps={computedFieldProps} />;
};

SuperRadioButton.displayName = 'SuperRadioButton';

export default SuperRadioButton;
