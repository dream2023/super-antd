import type { ColProps } from 'antd';
import React, { FC } from 'react';

import type { ApiType, BtnsProps } from 'super-antd';

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

export interface IFormDemoProps {
  /** 提交后是否重置表单。 */
  resetAfterSubmit?: boolean;
  /** 提交后，是否进行页面跳转。支持字符串形式的 URL 和 { target: "_self", url: "xxx" } */
  redirect?: string | { target?: string; url?: string };
  /** 是否开启表单的本地缓存。如果开启，将会将表单内容实时存储到 localStorage 中。 注意：因为存储时依赖 name 属性作为 localStorage 的 key，所以必须同时指定 name 属性。 */
  persistData?: boolean;
  /**
   * 表单提交成功后是否清除本地缓存。
   *
   * @default true
   */
  clearPersistDataAfterSubmit?: boolean;
  /** 用于初始化数据。 */
  initApi?: ApiType;
  /** 用于提交数据。 */
  api?: ApiType;
  /** 获取数据或者保存数据后的提示。 */
  message?: ServiceMessageType;
  /** 将 data 到目的组件 */
  updateName?: string;
  /** 刷新目标组件 */
  refreshName?: string;
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
  /**
   * Label 标签布局，功能共同 antd，不过其增加支持数字和字符串的功能。
   *
   * 例如 labelCol="4"、labelCol={4}、labelCol={{ span: 4 }}。
   *
   * @default 3
   */
  labelCol?: ColProps | number | string;
  /**
   * 用法同 antd 中 Form wrapperCol，不过其增加支持数字和字符串的功能。
   *
   * 例如 wrapperCol="20"、wrapperCol={20}、wrapperCol={{ span: 20 }}。
   *
   * @default 21
   */
  wrapperCol?: ColProps | number | string;
  /** 是否根据表单父元素宽度动态设置 labelCol 和 wrapperCol */
  isResponsive?: boolean;
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
}

const Demo: FC<IFormDemoProps> = () => <>Demo!</>;

export default Demo;
