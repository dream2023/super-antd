import { compilerStr } from '@dream2023/data-mapping';
import { useCreation } from 'ahooks';
import type { ComponentType, FC } from 'react';
import React, { useContext, useEffect } from 'react';

import type { SuperFormContextProps } from '@/form';
import { SuperFormContext } from '@/form';
import { SuperAntdContext } from '@/provider';
import { castToArray, get, getCol, isString, isUndefined, omit, set } from '@/shared';

import { useFormMock } from '../hooks/useFormMock';
import { getColon, getLabel, getLinkageValue, getName, getOppositionValue, getPlaceholder } from '../utils';
import type { WithFormItemProps } from './withFormItemTypes';
import { omitWithFormItemKeys } from './withFormItemTypes';

export interface WithFormItemConfigType {
  /** Mock 规则 */
  defaultMockRule?: any;
  /**
   * 如果有 placeholder 属性时，前缀
   *
   * @default '请输入'
   */
  placeholderPrefix?: string;
  /** 是否需要增强数据 增强的数据包括 data、form */
  needData?: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function withFormItem<P extends object>(FormItemComponent: ComponentType<P>, config: WithFormItemConfigType) {
  const { defaultMockRule, placeholderPrefix, needData } = config;
  const EnhancedFormComponent: FC<WithFormItemProps<P>> = (props) => {
    const {
      name,
      form,
      data,
      mock,
      help,
      colon,
      label,
      rules,
      active,
      visible,
      labelCol,
      disabled,
      readonly,
      required,
      hiddenOn,
      hideLabel,
      activeOn,
      visibleOn,
      disabledOn,
      readonlyOn,
      requiredOn,
      wrapperCol,
      placeholder,
      validateStatus,
      messageVariables,
      clearValueAfterHidden,
      clearValueAfterDisabled,
      clearValueAfterReadonly,
    } = props;

    // 模板映射时需要用的分隔符
    const { delimiters } = useContext(SuperAntdContext);
    // 表单 context
    const formContext = useContext<SuperFormContextProps>(SuperFormContext);
    const { layout, autoPlaceholder, hideLabel: formHideLabel, remoteErrors } = formContext;

    // 去除掉 SuperFormItem 相关属性，保留原始 FormItemComponent 属性并传递过去
    const componentProps = useCreation(() => {
      return omit(props, Object.keys(omitWithFormItemKeys));
    }, [props]);

    // labelCol 支持数字、字符串和对象
    const computedLabelCol = useCreation(() => {
      return getCol(labelCol);
    }, [labelCol]);

    // wrapperCol 支持数字、字符串和对象
    const computedWrapperCol = useCreation(() => {
      return getCol(wrapperCol);
    }, [labelCol]);

    // 将 name 转为字符串， ['info', 'name'] => 'info.name'
    const nameStr = useCreation<string>(() => {
      return castToArray(name).join('.');
    }, [name]);

    // 获取 colon
    const computedColon = useCreation(() => {
      return getColon(layout, label, colon, hideLabel, formHideLabel);
    }, [label, colon, hideLabel, formHideLabel]);

    // 名称，从 'info.name' => ['info', 'name']
    const computedName = useCreation(() => {
      return getName(name);
    }, [name]);

    // 获取 label
    const componentLabel = useCreation(() => {
      const res = getLabel(layout, label, colon, hideLabel, formHideLabel);
      return isString(res) ? compilerStr(res, { data }, delimiters) : res;
    }, [layout, label, colon, hideLabel, formHideLabel, delimiters, data]);

    // 联动必填
    const linkageRequired = useCreation(() => {
      // data, required, requiredOn, delimiters
      return getLinkageValue({ data, defaultValue: required, linkageFn: requiredOn, delimiters }); // 是否必填
    }, [data, required, requiredOn, delimiters]);

    // 联动只读
    const linkageReadonly = useCreation(() => {
      const isReadonly = getLinkageValue({ data, defaultValue: readonly, linkageFn: readonlyOn, delimiters }); // 是否只读
      // 本身只读或者全局只读都是返回 true
      return isReadonly || formContext.readonly;
    }, [data, readonly, readonlyOn, delimiters, formContext.readonly]);

    // 联动隐藏
    const linkageHidden = useCreation(() => {
      const isVisible = getLinkageValue({ data, defaultValue: visible, linkageFn: visibleOn, delimiters }); // 是否显示
      const isHidden = getLinkageValue({ data, linkageFn: hiddenOn, delimiters }); // 是否隐藏
      return getOppositionValue(isHidden, isVisible);
    }, [data, visible, visibleOn, hiddenOn, delimiters]);

    // 联动禁用
    const linkageDisabled = useCreation(() => {
      const isActive = getLinkageValue({ data, defaultValue: active, linkageFn: activeOn, delimiters }); // 是否启用
      const isDisabled = getLinkageValue({ data, defaultValue: disabled, linkageFn: disabledOn, delimiters }); // 是否禁用
      return getOppositionValue(isDisabled, isActive) || formContext.disabled;
    }, [data, active, activeOn, disabled, disabledOn, delimiters]);

    // 计算后的 placeholder
    const computedPlaceholder = useCreation(() => {
      if (!isUndefined(placeholder) && !isString(placeholder)) return placeholder;

      let placeholderStr: string | undefined = placeholder;
      if (isUndefined(placeholder)) {
        // 自动填充 placeholder
        placeholderStr = getPlaceholder({
          label,
          autoPlaceholder,
          messageVariables,
          placeholderPrefix,
        });
      }

      // 联动 placeholder
      return compilerStr(placeholderStr, { data }, delimiters);
    }, [data, delimiters, label, placeholder, autoPlaceholder, messageVariables, placeholderPrefix]);

    // 校检（融合必填）
    const computedRules = useCreation(() => {
      return [...(rules || []), { required: linkageRequired }];
    }, [rules, linkageRequired]);

    // 数据相关属性
    const dataProps = useCreation(() => {
      return needData ? { data, form } : {};
    }, [data]);

    // 动态必填，参考：https://ant.design/components/form-cn/#components-form-demo-dynamic-rule
    useEffect(() => {
      if (computedName) {
        form.validateFields([computedName]);
      }
    }, [computedName, form, linkageRequired]);

    // 设置校检
    useEffect(() => {
      if (
        (linkageReadonly && clearValueAfterReadonly) ||
        (linkageHidden && clearValueAfterHidden) ||
        (linkageDisabled && clearValueAfterDisabled)
      ) {
        // 如果 nameStr = 'foo.bar' 则 obj = {foo: { bar: undefined }}
        const obj = set({}, nameStr, undefined);
        form.setFieldsValue(obj);
      }
    }, [
      clearValueAfterDisabled,
      clearValueAfterHidden,
      clearValueAfterReadonly,
      form,
      linkageDisabled,
      linkageHidden,
      linkageReadonly,
      nameStr,
    ]);

    // mock 数据相关
    useFormMock({
      mock,
      formContext,
      disabledMock: !!(linkageReadonly || linkageHidden || linkageDisabled),
      name: nameStr,
      defaultMockRule,
      props,
    });

    // 远程错误信息展示
    const errorProps = useCreation(() => {
      if (computedName) {
        const errorMsg = get(remoteErrors, computedName);
        if (errorMsg) {
          return {
            validateStatus: 'error',
            help: errorMsg,
          };
        }
      }
      return { help, validateStatus };
    }, [help, validateStatus, remoteErrors, computedName]);

    return (
      <FormItemComponent
        {...(componentProps as P)}
        {...dataProps}
        {...errorProps}
        name={computedName}
        colon={computedColon}
        rules={computedRules}
        label={componentLabel}
        hidden={linkageHidden}
        disabled={linkageDisabled}
        readonly={linkageReadonly}
        required={linkageRequired}
        labelCol={computedLabelCol}
        wrapperCol={computedWrapperCol}
        placeholder={computedPlaceholder}
      />
    );
  };

  return EnhancedFormComponent;
}
