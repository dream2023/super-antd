import { useCreation } from 'ahooks';
import { Button, Space } from 'antd';
import type { ButtonProps } from 'antd/lib/button';
import React, { isValidElement } from 'react';
import type { FC, ReactChild, ReactElement } from 'react';

import { castToArray } from '@/shared';

export interface SuperButtonProps extends ButtonProps {
  text?: ReactChild;
  visible?: boolean;
  key?: string | number;
}

// 按钮列表
export type BtnsType = (SuperButtonProps | ReactElement<ButtonProps>)[];
export type BtnsAlignType = 'left' | 'right' | 'center';
export interface SuperBtnsProps {
  /** 按钮对齐方法。 */
  btnsAlign?: BtnsAlignType;

  /** 按钮列表 */
  btns?: BtnsType;

  /** 按钮列表 class */
  className?: string;
}

// 将多种类型转为正常的 Button 数组
function changeBtnsToNormal(btns?: BtnsType): ReactElement<ButtonProps>[] {
  return castToArray(btns)
    .filter((item) => item.visible !== false)
    .map(({ visible, text, ...item }) => {
      return isValidElement(item) ? item : <Button {...item}>{item.children || text}</Button>;
    });
}

// 对齐方式映射关系
const alignMap: Record<BtnsAlignType, string> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const SuperBtns: FC<SuperBtnsProps> = ({ btns, btnsAlign, className }) => {
  const align = useCreation(() => {
    if (!btnsAlign) return alignMap.left;
    return alignMap[btnsAlign];
  }, [btnsAlign]);

  // btns 转为 button 数组
  const btnsArr: ReactElement<ButtonProps>[] = useCreation(() => changeBtnsToNormal(btns), [btns]);

  if (!btnsArr.length) return null;
  return (
    <Space style={{ justifyContent: align }} className={className}>
      {btnsArr}
    </Space>
  );
};

export default SuperBtns;
