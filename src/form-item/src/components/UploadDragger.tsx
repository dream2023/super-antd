import { ProFormUploadDragger } from '@ant-design/pro-form';
import type { ProFormDraggerProps } from '@ant-design/pro-form/lib/components/UploadDragger';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperUploadDraggerProps = CreateSuperFormItemProps<ProFormDraggerProps>;
export const SuperUploadDragger = createSuperFormItem<ProFormDraggerProps>(ProFormUploadDragger, {});
SuperUploadDragger.displayName = 'SuperUploadDragger';

export default SuperUploadDragger;
