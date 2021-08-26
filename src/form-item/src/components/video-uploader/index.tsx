import type { CreateSuperFormItemProps } from '../../createSuperFormItem';
import { createSuperFormItem } from '../../createSuperFormItem';
import type { VideoUploaderProps } from './VideoUploader';
import VideoUploader from './VideoUploader';

export type SuperVideoUploaderProps = CreateSuperFormItemProps<VideoUploaderProps>;
export const SuperVideoUploader = createSuperFormItem<VideoUploaderProps>(VideoUploader);
SuperVideoUploader.displayName = 'SuperVideoUploader';
