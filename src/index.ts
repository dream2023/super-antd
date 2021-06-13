import './theme/common.less';

import { setFilters } from '@dream2023/data-mapping';

import * as builtinFilters from './shared/src/filters';

// 设置内置过滤函数
setFilters(builtinFilters);

export * from './hoc';
export * from './form';
export * from './btns';
export * from './shared';
export * from './render';
export * from './provider';
export * from './form-item';
