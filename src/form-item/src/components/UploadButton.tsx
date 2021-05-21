import { ProFormUploadButton } from '@ant-design/pro-form';
import type { ProFormDraggerProps } from '@ant-design/pro-form/lib/components/UploadButton';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperUploadButtonProps = CreateSuperFormItemProps<ProFormDraggerProps>;
export const SuperUploadButton = createSuperFormItem<ProFormDraggerProps>(ProFormUploadButton, {});
SuperUploadButton.displayName = 'SuperUploadButton';

export default SuperUploadButton;
