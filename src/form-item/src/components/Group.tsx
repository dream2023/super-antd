import { ProFormGroup } from '@ant-design/pro-form';
import { Form } from 'antd';
import type { FC } from 'react';
import React from 'react';

export interface SuperGroupProps {
  label?: string;
}
export const SuperGroup: FC<SuperGroupProps> = ({ label, children }) => {
  return (
    <Form.Item label={label}>
      <ProFormGroup>{children}</ProFormGroup>
    </Form.Item>
  );
};
SuperGroup.displayName = 'SuperGroup';
export default SuperGroup;
