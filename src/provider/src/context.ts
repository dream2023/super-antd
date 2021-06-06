import type { filtersType } from '@dream2023/data-mapping';
import { createContext } from 'react';
import type { SchemaRenderContextProps } from 'react-schema-render';

import type { ComponentPropsType } from '@/render/src/componentPropsParser';
import type { AxiosContextProps } from '@/shared/src/hooks/useAxios/types';
import type { CommunicationProps } from '@/shared/src/hooks/useCommunication';

export interface SuperAntdContextProps extends CommunicationProps, SchemaRenderContextProps, AxiosContextProps {
  // 组件默认属性
  componentProps?: ComponentPropsType;
  // 分隔符
  delimiters?: [string, string];
  // 自定义过滤器
  filters?: filtersType;
}

export const SuperAntdContext = createContext<SuperAntdContextProps>({});
export default SuperAntdContext;
