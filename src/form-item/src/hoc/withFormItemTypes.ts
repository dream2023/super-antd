import type { ProFormItemProps } from '@ant-design/pro-form/lib/interface';
import type { FormInstance } from 'antd';

import type { Col } from '@/shared';

import type { LinkageFunctionType } from '../utils';

export interface InjectedWithFormItemProps {
  /** 外部注入 当前作用域下的数据 */
  data: Record<string, any>;
  /** 外部注入 当前作用域下的表单 */
  form: FormInstance<any>;
  /** 外部注入 联动字段 */
  linkageFields?: string | string[];
}

// 表单项项增加的属性
export interface NewWithFormItemProps {
  /** 联动只读 */
  readonlyOn?: LinkageFunctionType;
  /** 联动禁用 */
  disabledOn?: LinkageFunctionType;
  /** 联动 required */
  requiredOn?: LinkageFunctionType;
  /** 当前表单项是否为激活状态。其与 disabled 仅逻辑相反，无其他不同。 */
  active?: boolean;
  /** 动态设置当前表单项激活状态。其与 disabledOn 仅逻辑相反，并无其他不同。 */
  activeOn?: LinkageFunctionType;
  /** 根据条件动态隐藏表单项。例如：hiddenOn={ data => data.age < 18 } 或者 {{data.age < 18}} */
  hiddenOn?: LinkageFunctionType;
  /** 是否显示表单项。其与 Form.Item 原 hidden 逻辑相反，并无其他不同。 */
  visible?: boolean;
  /** 根据条件动态设置 visible。例如：visibleOn={ data => data.province } 或者 {{ data.province }} */
  visibleOn?: LinkageFunctionType;
  /** 当表单项隐藏后，是否清除其值。 */
  clearValueAfterHidden?: boolean;
  /** 当表单项禁用后，是否清除其值。 */
  clearValueAfterDisabled?: boolean;
  /** 当表单项只读以后，是否清除其值。 */
  clearValueAfterReadonly?: boolean;
  /** 是否隐藏 label。当我们想要保留 label 作为校检的名称，又不想显示 label 时，可以将其设置为 true。 */
  hideLabel?: boolean;
  /** 表单项所占栅格数量 */
  itemSpan?: number;
  // 计算属性
  computed?: LinkageFunctionType;
}

// 更改原表单项属性
export interface OverwriteWithFormItemProps {
  // label 标签布局，相对于 antd 支持数字、字符串和对象三种形式
  labelCol?: Col;
  // 内容布局，相对于 antd 支持数字、字符串和对象三种形式
  wrapperCol?: Col;
}

// 表单项默认属性 = ProFormItemProps + 覆盖的属性 + readonly
// readonly 在 ProFormItemProps 并未导出，但实际有
export type DefaultFormItemProps<T = any> = Omit<ProFormItemProps<T>, keyof OverwriteWithFormItemProps> &
  OverwriteWithFormItemProps & { readonly?: boolean };

// 表单项属性等于 = 默认属性 props + 联动 props + 新 props
export type WithFormItemProps<P = any> = P & DefaultFormItemProps<P> & InjectedWithFormItemProps & NewWithFormItemProps;

// 不能直接传递给 Component 的属性
export type OmitWithFormItemProps = InjectedWithFormItemProps & OverwriteWithFormItemProps & NewWithFormItemProps;

// 用于精准剔除自定义的 keys
export const omitWithFormItemKeys: Record<keyof OmitWithFormItemProps, any> = {
  data: '',
  form: '',
  active: '',
  visible: '',
  activeOn: '',
  hiddenOn: '',
  labelCol: '',
  computed: '',
  itemSpan: '',
  visibleOn: '',
  hideLabel: '',
  disabledOn: '',
  readonlyOn: '',
  wrapperCol: '',
  requiredOn: '',
  linkageFields: '',
  clearValueAfterHidden: '',
  clearValueAfterDisabled: '',
  clearValueAfterReadonly: '',
};
