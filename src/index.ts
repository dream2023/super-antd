import './theme/common.less';

import { setFilters } from '@dream2023/data-mapping';

import * as builtinFilters from './shared/src/filters';

// 设置内置过滤函数
setFilters(builtinFilters);

export * from './btns';
export * from './form';
export * from './form-item';
export * from './hoc';
export * from './provider';
export * from './render';
export { ErrorNotifyType, SuccessNotifyType } from './shared';
