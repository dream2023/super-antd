import type { Key } from 'react';

import type { BtnsAlignType, BtnsType, SuperButtonProps } from '@/btns';
import type { ApiType, Col, JumpTarget, NoopType } from '@/shared';

// service 类型
export interface ServiceMessageType {
  /** 初始化数据成功的提示。 */
  initSuccess?: string;
  /** 初始化数据失败的提示。 */
  initError?: string;
  /** 保存数据成功时的提示。 */
  saveSuccess?: string;
  /** 保存数据失败时的提示。 */
  saveError?: string;
}

// 用于组件类型扩展
export interface SuperServiceProps {
  /** 用于初始化数据。 */
  initApi?: ApiType;
  /** 用于提交数据。 */
  api?: ApiType;
  /** 获取数据或者保存数据后的提示。 */
  message?: ServiceMessageType;
}

/** 组件通信 */
export interface FormCommunicationProps {
  /** 将 data 到目的组件 */
  updateName?: string;
  /** 刷新目标组件 */
  refreshName?: string;
}

/** 数据持久化 */
export interface PersistDataProps {
  /** 是否开启表单的本地缓存。如果开启，将会将表单内容实时存储到 localStorage 中。 注意：因为存储时依赖 name 属性作为 localStorage 的 key，所以必须同时指定 name 属性。 */
  persistData?: boolean;
  /**
   * 表单提交成功后是否清除本地缓存。
   *
   * @default true
   */
  clearPersistDataAfterSubmit?: boolean;
}

/** 提交后的行为 */
export interface ActionProps {
  /** 提交后是否重置表单。 */
  resetAfterSubmit?: boolean;
  /** 提交后，是否进行页面跳转。支持字符串形式的 URL 和 { target: "_self", url: "xxx" } */
  redirect?: JumpTarget;
}

/** 标签和响应式 */
export interface LabelAndResponseProps {
  /**
   * Label 标签布局，功能共同 antd，不过其增加支持数字和字符串的功能。
   *
   * 例如 labelCol="4"、labelCol={4}、labelCol={{ span: 4 }}。
   *
   * @default 3
   */
  labelCol?: Col;
  /**
   * 用法同 antd 中 Form wrapperCol，不过其增加支持数字和字符串的功能。
   *
   * 例如 wrapperCol="20"、wrapperCol={20}、wrapperCol={{ span: 20 }}。
   *
   * @default 21
   */
  wrapperCol?: Col;
  /** 是否根据表单父元素宽度动态设置 labelCol 和 wrapperCol */
  isResponsive?: boolean;
}

/** 表单项需要的属性 */
export interface FormItemNeedsProps {
  /** 是否开启全局禁用。 */
  disabled?: boolean;
  /** 是否开启全局只读。 */
  readonly?: boolean;
  /** 隐藏标签 */
  hideLabel?: boolean;
  /**
   * 是否自动填充 placeholder
   *
   * @default true
   */
  autoPlaceholder?: boolean;
}

// 表单按钮类型
export type FormBtnType = string | boolean | SuperButtonProps;

/** 表单按钮相关属性 */
export interface BtnsProps {
  /**
   * 提交按钮。同时支持字符串和布尔值。 当为字符串时，代表提交按钮的文本内容；当为布尔值时，则代表是否显示此按钮。
   *
   * @default 提交
   */
  submitBtn?: FormBtnType;

  /**
   * 重置按钮。同时支持字符串和布尔值。 当为字符串时，代表提交按钮的文本内容；当为布尔值时，则代表是否显示此按钮。
   *
   * @default 重置
   */
  resetBtn?: FormBtnType;

  /** 取消按钮。同时支持字符串和布尔值。 当为字符串时，代表提交按钮的文本内容；当为布尔值时，则代表是否显示此按钮。 */
  cancelBtn?: FormBtnType;

  /** 当点击取消时，触发的事件回调。 */
  onCancel?: NoopType;

  /** 当点击重置时，触发的事件回调。 */
  onReset?: NoopType;

  /**
   * 其他按钮。如果提交、取消、重置按钮无法满足需求，可以自定义更多按钮。支持单个按钮或者数组按钮列表。
   *
   * @type BtnsType;
   */
  extraBtns?: BtnsType;

  /** 按钮对齐方法。 */
  btnsAlign?: BtnsAlignType;

  /** 自定义渲染内容。 */
  render?: (data: Record<Key, any>, doms?: JSX.Element) => React.ReactNode[] | React.ReactNode | false;
}

export interface FormEnhancedProps {
  /**
   * 防抖时间(毫秒) 对值变化后的相应处理
   *
   * @default 200
   */
  throttleTimeout?: number;
  /** 是否开启调试模式。 当开启调试模式后，可以在界面上实时观察数据变化。 */
  debug?: boolean;
  /** 按钮相关 */
  btns?: BtnsProps;
  /** 对齐方式 */
  align?: 'left' | 'right' | 'center';
  /** 是否保留远程获取的非表单项里的数据，例如 {id: 1, name: 'Jerry'} id 未设置表单项，antd 默认会删除，如果开启，则保留 */
  preserveRemoteData?: boolean;
}
