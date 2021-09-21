import React, { FC } from 'react';

export interface BMapProps {
  /**
   * 秘钥，必填
   */
  ak: string;
  /**
   * 缩放比例
   * @default 12
   */
  zoom?: number;
  /**
   * 提示语
   * @default '请选择位置'
   */
  placeholder?: string;
  /**
   * 是否显示导航组件
   * @default true
   */
  showNavigation?: boolean;
  /**
   * 是否显示定位组件
   * @default true
   */
  showGeolocation?: boolean;
  /**
   * 是否允许滚轮缩放
   * @default true
   */
  enableScrollWheelZoom?: boolean;
  /**
   * 地图高度
   * @default 400
   */
  height?: number;
}

const BMap: FC<BMapProps> = () => <>Demo!</>;

export default BMap;
