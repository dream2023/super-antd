import { useCreation, useSize } from 'ahooks';
import type { FormLayout } from 'antd/lib/form/Form';
import { useRef } from 'react';

import type { Col } from '../../utils';
import { getCol } from '../../utils';

// 分割点
export type BreakpointType = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

// 分割点对应的宽度
export const BreakpointWidth: Record<BreakpointType, number> = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

// 分割点对应的字符
export const BreakpointName: Record<BreakpointType, BreakpointType> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  xxl: 'xxl',
};

// 分割点对应的 label 和 wrapperCol
export const labelAndWrapperCol: Record<BreakpointType, { labelCol: number; wrapperCol: number }> = {
  sm: { labelCol: 24, wrapperCol: 24 },
  md: { labelCol: 4, wrapperCol: 16 },
  lg: { labelCol: 4, wrapperCol: 14 },
  xl: { labelCol: 3, wrapperCol: 12 },
  xxl: { labelCol: 2, wrapperCol: 10 },
};

/** 响应式 Col 对应的参数 */
export interface ResponsiveColOptions {
  // 标签布局，支持数字、字符串和对象
  labelCol?: Col;
  // 内容布局，支持数字、字符串和对象
  wrapperCol?: Col;
  // 表单的 layout 属性
  layout?: FormLayout;
  // 是否隐藏标签
  hideLabel?: boolean;
  // 表单项布局
  itemCount?: number;
  // 是否开启响应式
  isResponsive?: boolean;
  // 对齐方式
  // 响应式仅在 align 为 left 时生效
  align?: 'left' | 'right' | 'center';
}

export const useResponsiveCol = ({
  layout = 'horizontal',
  itemCount = 1,
  isResponsive = true,
  labelCol,
  align = 'left',
  wrapperCol,
  hideLabel,
}: ResponsiveColOptions = {}) => {
  const ref = useRef(null);
  const size = useSize(ref);

  // 获取 DOM 的 width
  const width = useCreation(() => {
    const { width: domWidth } = size;
    return domWidth;
  }, [size]);

  // 跟踪 width 变化，并根据变化计算出当前节点
  const point = useCreation<BreakpointType | undefined>(() => {
    if (width) {
      if (width <= BreakpointWidth.sm) {
        return BreakpointName.sm;
      }
      if (width <= BreakpointWidth.md) {
        return BreakpointName.md;
      }
      if (width <= BreakpointWidth.lg) {
        return BreakpointName.lg;
      }
      if (width <= BreakpointWidth.xl) {
        return BreakpointName.xl;
      }
      return BreakpointName.xxl;
    }
    return undefined;
  }, [width]);

  // 判断是否已经开启响应式
  const shouldResponsive = useCreation(() => {
    // itemCount < 1 且 isResponsive 为 true 并且没有指定 labelCol 和 wrapperCol
    return (
      Number(itemCount) <= 1 && layout === 'horizontal' && align === 'left' && isResponsive && !labelCol && !wrapperCol
    );
  }, [layout, itemCount, isResponsive, labelCol, wrapperCol, align]);

  // 通过 ref 绑定 DOM
  const responsiveRef = useCreation(() => {
    return shouldResponsive ? ref : null;
  }, [shouldResponsive, ref]);

  // 获取响应式的 LabelCol
  const responsiveLabelCol = useCreation(() => {
    if (hideLabel) return { span: 0 };
    if (labelCol) return getCol(labelCol);
    return point ? { span: labelAndWrapperCol[point].labelCol } : undefined;
  }, [point, labelCol, hideLabel]);

  // 获取响应式的 WrapperLabel
  const responsiveWrapperCol = useCreation(() => {
    if (wrapperCol) return getCol(wrapperCol);
    return point ? { span: labelAndWrapperCol[point].wrapperCol } : undefined;
  }, [point, wrapperCol]);

  return {
    responsiveRef,
    shouldResponsive,
    responsiveLabelCol,
    responsiveWrapperCol,
  };
};
