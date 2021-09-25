import type { CreateSuperFormItemProps } from '../../createSuperFormItem';
import { createSuperFormItem } from '../../createSuperFormItem';
import type { ImageUploaderProps } from './ImageUploader';
import ImageUploader from './ImageUploader';

export type SuperImageUploaderProps = CreateSuperFormItemProps<ImageUploaderProps>;
export const SuperImageUploader = createSuperFormItem<ImageUploaderProps>(ImageUploader);
SuperImageUploader.displayName = 'SuperImageUploader';

export default SuperImageUploader;
