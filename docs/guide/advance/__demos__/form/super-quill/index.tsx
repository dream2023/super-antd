import type { FC } from 'react';

import { createSuperFormItem } from 'super-antd';
import type { CreateSuperFormItemProps } from 'super-antd';

import ProFormQuill from './ProFormQuill';
import type { ProFormQuillProps } from './ProFormQuill';

export type SuperQuillProps = CreateSuperFormItemProps<ProFormQuillProps>;
const SuperQuill: FC<SuperQuillProps> = createSuperFormItem(ProFormQuill);

export default SuperQuill;
