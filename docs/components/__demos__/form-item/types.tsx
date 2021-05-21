import type { ColProps } from 'antd';
import React, { FC } from 'react';

type LinkageFunctionType = ((data: Record<any, any>) => any) | string;
type ColType = ColProps | number | string;

export interface FormItemProps {
  /**
   * Label 标签布局。 与 antd 不同的时，它不仅支持 ColProps 还支持 number 和 string;
   *
   * @type ColProps
   *
   *   | number | string
   */
  labelCol?: ColType;
  /**
   * 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol
   *
   * @type ColProps
   *
   *   | number | string
   */
  wrapperCol?: ColType;
  /** 只读。 */
  readonly?: boolean;
  /** 禁用。 */
  disabled?: boolean;
  /** 占位符。 支持模板字符串。 */
  placeholder?: string;
  /** 关联字段 */
  linkageFields?: string[];
  /**
   * 联动只读
   *
   * @type ((data: Record<any, any>) => any) | string
   */
  readonlyOn?: LinkageFunctionType;
  /**
   * 联动禁用
   *
   * @type ((data: Record<any, any>) => any) | string
   */
  disabledOn?: LinkageFunctionType;
  /**
   * 联动 required
   *
   * @type ((data: Record<any, any>) => any) | string
   */
  requiredOn?: LinkageFunctionType;
  /** 当前表单项是否为激活状态。其与 disabled 仅逻辑相反，无其他不同。 */
  active?: boolean;
  /**
   * 动态设置当前表单项激活状态。其与 disabledOn 仅逻辑相反，并无其他不同。
   *
   * @type ((data: Record<any, any>) => any) | string
   */
  activeOn?: LinkageFunctionType;
  /**
   * 根据条件动态隐藏表单项。例如：hiddenOn={ data => data.age < 18 } 或者 {{data.age < 18}}
   *
   * @type ((data: Record<any, any>) => any) | string
   */
  hiddenOn?: LinkageFunctionType;
  /** 是否显示表单项。其与 Form.Item 原 hidden 逻辑相反，并无其他不同。 */
  visible?: boolean;
  /**
   * 根据条件动态设置 visible。例如：visibleOn={ data => data.province } 或者 {{ data.province }}
   *
   * @type ((data: Record<any, any>) => any) | string
   */
  visibleOn?: LinkageFunctionType;
  /** 当表单项隐藏后，是否清除其值。 */
  clearValueAfterHidden?: boolean;
  /** 当表单项禁用后，是否清除其值。 */
  clearValueAfterDisabled?: boolean;
  /** 当表单项只读以后，是否清除其值。 */
  clearValueAfterReadonly?: boolean;
  /** Mock 数据 */
  mock?: any;
  /** 是否隐藏 label。当我们想要保留 label 作为校检的名称，又不想显示 label 时，可以将其设置为 true。 */
  hideLabel?: boolean;
}

const FormItem: FC<FormItemProps> = () => <>Demo!</>;

export default FormItem;
