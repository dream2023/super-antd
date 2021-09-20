import type { FC } from 'react';

import type { CreateSuperFormItemProps } from '../../createSuperFormItem';
import { createSuperFormItem } from '../../createSuperFormItem';
import type { ProFormBaiduMapProps } from './ProFormBaiduMap';
import ProFormBaiduMap from './ProFormBaiduMap';

export type SuperBaiduMapProps = CreateSuperFormItemProps<ProFormBaiduMapProps>;
export const SuperBaiduMap: FC<SuperBaiduMapProps> = createSuperFormItem(ProFormBaiduMap);
SuperBaiduMap.displayName = 'SuperBaiduMap';

export default SuperBaiduMap;
