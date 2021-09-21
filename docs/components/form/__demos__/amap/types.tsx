import React, { FC } from 'react';

export interface AMapProps {
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
   * 是否显示工具组件
   * @default true
   */
  showToolBar?: boolean;
  /**
   * 是否显示定位组件
   * @default true
   */
  showGeolocation?: boolean;
  /**
   * 地图高度
   * @default 400
   */
  height?: number;
}

const AMap: FC<AMapProps> = () => <>Demo!</>;

export default AMap;
