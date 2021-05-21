import type { BtnsType, SuperButtonProps } from '@/btns';
import type { NoopType } from '@/shared';
import { isNil } from '@/shared';
import { isBoolean } from '@/shared';
import { isPlainObject } from '@/shared';

import type { BtnsProps } from './types';

// 获取按钮文本
export function getBtnText(btn: boolean | string | undefined, defaultText: string) {
  return isNil(btn) || isBoolean(btn) ? defaultText : btn;
}

// 获取按钮
export interface GetBtnOptions {
  btn?: string | boolean | SuperButtonProps;
  onClick?: NoopType;
  disabled?: boolean;
  key?: string;
  htmlType?: 'submit' | 'reset';
  type?: 'primary';
  defaultText: string;
}
export function getBtn({ btn, onClick, key, type, htmlType, disabled, defaultText }: GetBtnOptions): SuperButtonProps {
  if (isPlainObject(btn)) {
    return {
      disabled,
      key: key || htmlType,
      htmlType,
      type,
      visible: btn.visible === undefined ? true : btn.visible,
      onClick,
      ...btn,
    };
  }
  return {
    disabled,
    key: key || htmlType,
    htmlType,
    type,
    visible: !!btn,
    onClick,
    children: getBtnText(btn, defaultText),
  };
}

interface MockBtnOptions {
  mockBtn: string | boolean | SuperButtonProps;
  onMock: NoopType;
}

interface GetBtnsOptions extends BtnsProps, MockBtnOptions {
  disabled?: boolean;
}

// 获取按钮列表
export function getBtns(options: GetBtnsOptions): BtnsType {
  // TODO 取消 cancel，等到和弹窗结合的时候再做决定
  const {
    disabled,
    onReset,
    mockBtn,
    onMock,
    onCancel,
    resetBtn = true,
    submitBtn = true,
    cancelBtn = false,
    extraBtns = [],
  } = options;
  const builtInBtns: SuperButtonProps[] = [
    getBtn({
      btn: submitBtn,
      disabled,
      htmlType: 'submit',
      type: 'primary',
      defaultText: '提交',
    }),
    getBtn({
      disabled,
      btn: resetBtn,
      onClick: onReset,
      htmlType: 'reset',
      defaultText: '重置',
    }),
    getBtn({
      disabled,
      btn: mockBtn,
      onClick: onMock,
      key: 'mock',
      defaultText: 'Mock 数据',
    }),
    getBtn({
      disabled,
      btn: cancelBtn,
      onClick: onCancel,
      key: 'cancel',
      defaultText: '取消',
    }),
  ].filter((item) => Boolean(item.visible));

  return (builtInBtns as BtnsType).concat(extraBtns);
}
