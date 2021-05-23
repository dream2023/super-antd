import './form.less';

import ProForm from '@ant-design/pro-form';
import type { ProFormProps } from '@ant-design/pro-form';
import { useCreation, useLocalStorageState, usePersistFn, useThrottleFn } from 'ahooks';
import { Form, Spin } from 'antd';
import type { Key} from 'react';
import { useContext } from 'react';
import React, { useState } from 'react';
import warning from 'tiny-warning';

import { SuperBtns } from '@/btns';
import type { ErrorData } from '@/shared';
import { isPlainObject, useAxios, useCommunication, useMock, useResponsiveCol } from '@/shared';
import { useJump } from '@/shared/src/hooks/useJump';

import type { SuperFormContextProps } from './context';
import { SuperFormContext } from './context';
import { SuperFormDebugger } from './FormDebugger';
import { SuperAntdContext } from '@/provider';

import type {
  ActionProps,
  FormCommunicationProps,
  FormEnhancedProps,
  FormItemNeedsProps,
  LabelAndResponseProps,
  PersistDataProps,
  SuperServiceProps,
} from './types';
import { getBtns } from './utils';

export interface SuperFormProps<T>
  extends Omit<ProFormProps<T>, 'labelCol' | 'wrapperCol' | 'submitter'>,
    ActionProps,
    PersistDataProps,
    SuperServiceProps,
    FormCommunicationProps,
    FormItemNeedsProps,
    LabelAndResponseProps,
    FormEnhancedProps {}

export function SuperForm<Values extends Record<Key, any> = any>(props: SuperFormProps<Values>) {
  const {
    // service
    api,
    initApi,
    message,

    // 组件通信
    updateName,
    refreshName,

    // 持久化
    persistData,
    clearPersistDataAfterSubmit = true,

    // 提交后的行为
    redirect,
    resetAfterSubmit,

    // 响应式和标签
    labelCol,
    wrapperCol,
    isResponsive,

    // 对齐方式
    align,

    // debug 模式
    debug,

    // mock 数据
    mock,

    // form item 需要用到的属性
    readonly,
    disabled,
    hideLabel,
    autoPlaceholder,

    // 触发改变
    throttleTimeout,

    // 按钮相关
    btns,

    // 保留远程数据
    preserveRemoteData,

    // 原 form 属性
    name,
    form,
    layout,
    children,
    onFinish,
    initialValues,
    onValuesChange,

    // 剩余的表单属性
    ...resetProps
  } = props;

  // 全局上下文
  const { mockjs } = useContext(SuperAntdContext)

  // 表单引用
  const [formInstance] = Form.useForm<Values>(form);

  // 持久化数据
  const [localValues, setLocalValues] = useLocalStorageState(name || '');

  // 表单初始值，需要考虑到持久化数据
  const initialValuesWithStorage = useCreation(() => {
    if (persistData && name && isPlainObject(localValues)) {
      return {
        ...initialValues,
        ...localValues,
      };
    }

    if (persistData) {
      warning(
        name,
        `[super-antd/form]: persistData 参数需要提供 name 属性，name 属性请参考：https://ant.design/components/form-cn/#Form`,
      );
    }

    return initialValues;
  }, [persistData, name, initialValues, localValues]);

  // 值改变时处理函数
  const changeValues = usePersistFn((data: Values) => {
    // 外部传入的
    if (onValuesChange) {
      onValuesChange(data, data);
    }

    // 数据持久化
    if (persistData && name) {
      setLocalValues(data);
    }
  });

  // 获取表单初始值
  const { loading: initLoading, data: remoteInitData, refresh } = useAxios({
    api: initApi,
    currentData: initialValuesWithStorage,
    onSuccess: (data: unknown) => {
      if (isPlainObject(data)) {
        // 设置表单值
        formInstance.setFieldsValue(data as any);
        changeValues(data as Values);
        return;
      }

      warning(
        false,
        `[super-antd/form]：${JSON.stringify(
          initApi,
        )} 远程获取数据错误，期望为【object】类型，实际为【${typeof data}】类型，具体数据为${data}`,
      );
    },
    message: {
      success: message?.initSuccess,
      error: message?.initError,
    },
  });

  // 组件之间通信
  const { refreshTarget, updateTargetData } = useCommunication({
    myName: name,
    updateTargetName: updateName,
    refreshTargetName: refreshName,
    updateMySelfData: (data: any) => {
      if (isPlainObject(data)) {
        formInstance.setFieldsValue(data as any);
        changeValues(formInstance.getFieldsValue());
        return;
      }

      warning(
        false,
        `[super-antd/form]：组件通信时数据类型错误，期望为【object】类型，实际为【${typeof data}】类型，具体数据为：${data}`,
      );
    },
    refreshMyself: initApi ? refresh : undefined,
  });

  const jump = useJump();

  // 提交成功
  const handleSubmitSuccess = usePersistFn((data: Values) => {
    // 如果有刷新，则刷新目标组件
    if (refreshName) {
      refreshTarget();
    }
    // 如果有关联更新的组件，则更新组件
    if (updateName) {
      updateTargetData(data);
    }
    // 移除持久化
    if (persistData && clearPersistDataAfterSubmit && name) {
      setLocalValues();
    }
    // 重置表单
    if (resetAfterSubmit) {
      formInstance.resetFields();
    }
    // 跳转
    if (redirect) {
      jump(redirect);
    }
  });

  const [remoteErrors, setRemoteErrors] = useState({});

  // 发起网络请求
  const { loading: saveLoading, run: runSave } = useAxios({
    api,
    manual: true,
    onSuccess: (data) => {
      handleSubmitSuccess((isPlainObject(data) ? data : {}) as any);
    },
    message: {
      success: message?.saveSuccess,
      error: message?.saveError,
    },
    onError: (e: ErrorData) => {
      if (e.errors) {
        setRemoteErrors(e.errors);
      }
    },
  });

  // mock 数据相关
  const initMockRules = useCreation(() => {
    return isPlainObject(mock) ? mock : {};
  }, [mock]);

  const { hasMockRules, setMock, mockRules } = useMock<Values>({
    Mock: mockjs,
    initMockRules,
    onMockCallback: (mockData: Values) => {
      const data: any = { ...(formInstance.getFieldsValue() || {}), ...mockData };
      formInstance.setFieldsValue(data);
    }
  });

  // form context 相关
  const formContextValue = useCreation<SuperFormContextProps<Values>>(() => {
    return {
      layout,
      readonly,
      disabled,
      mockRules,
      hideLabel,
      form: formInstance,
      isMock: !!mock,
      autoPlaceholder,
      remoteErrors,
    };
  }, [mock, remoteErrors, layout, formInstance, readonly, disabled, hideLabel, mockRules, autoPlaceholder]);

  // loading 效果（初始化和提交数据时）
  const loading = useCreation(() => {
    return initLoading || saveLoading;
  }, [initLoading, saveLoading]);

  // 响应式
  const { responsiveRef, responsiveLabelCol, responsiveWrapperCol } = useResponsiveCol({
    layout,
    align,
    labelCol,
    hideLabel,
    wrapperCol,
    isResponsive,
  });

  // 提交数据
  const handleFinish = usePersistFn(async (values: any) => {
    const data = preserveRemoteData ? { ...(remoteInitData || {}), ...values } : values;

    if (onFinish) {
      onFinish(data);
    }

    // 发起请求
    if (api) {
      runSave(data);
    }

    // 如果没有 api，则不需要异步判断，直接调用成功的方法
    if (!api) {
      handleSubmitSuccess(data);
    }
  });

  // 节流，表单 values 改变
  const { run: handleValuesChange } = useThrottleFn(
    (x: any, allValues: Values) => {
      changeValues(allValues);

      // 清除远程的错误
      if (Object.keys(remoteErrors)) {
        setRemoteErrors({});
      }
    },
    { wait: throttleTimeout },
  );

  const btnDoms = useCreation(() => {
    const computedBtns = getBtns({
      ...btns,
      mockBtn: hasMockRules,
      onMock: setMock,
      disabled: disabled || readonly,
    });

    const doms =
      computedBtns.length > 0 ? (
        <SuperBtns className="super-form-btns" btns={computedBtns} btnsAlign={btns?.btnsAlign}></SuperBtns>
      ) : undefined;

    if (btns?.render) {
      return btns.render(formInstance.getFieldsValue(), doms);
    }
    return doms;
  }, [hasMockRules, disabled, readonly, btns]);

  return (
    <Spin spinning={loading} delay={500}>
      <div className={align ? `super-antd-${align}` : undefined} ref={responsiveRef}>
        <ProForm<Values>
          name={name}
          form={formInstance}
          layout={layout}
          submitter={false}
          onFinish={handleFinish}
          labelCol={responsiveLabelCol}
          wrapperCol={responsiveWrapperCol}
          onValuesChange={handleValuesChange}
          initialValues={initialValuesWithStorage}
          {...resetProps}
        >
          {/* debug 数据 */}
          {debug && <SuperFormDebugger />}

          {/* children 数据 */}
          <SuperFormContext.Provider value={formContextValue}>{children}</SuperFormContext.Provider>
          {btnDoms && (
            <Form.Item
              wrapperCol={{
                offset: responsiveLabelCol?.span,
                span: responsiveWrapperCol?.span,
              }}
            >
              {btnDoms}
            </Form.Item>
          )}
        </ProForm>
      </div>
    </Spin>
  );
}

SuperForm.defaultProps = {
  autoPlaceholder: true,
  clearPersistDataAfterSubmit: true,
  btns: {
    submitBtn: '提交',
    resetBtn: '重置',
  },
  message: {
    saveSuccess: '保存成功',
  },
  throttleTimeout: 200,
};

export default SuperForm;
