import { ProFormSlider } from '@ant-design/pro-form';
import type { ProFormSliderProps } from '@ant-design/pro-form/lib/components/Slider';
import type { Mockjs } from 'mockjs';

import type { CreateSuperFormItemProps } from '../createSuperFormItem';
import { createSuperFormItem } from '../createSuperFormItem';

export type SuperSliderProps = CreateSuperFormItemProps<ProFormSliderProps>;
export const SuperSlider = createSuperFormItem<ProFormSliderProps>(ProFormSlider, {
  defaultMockRule: (props: ProFormSliderProps) => {
    return (Mock: Mockjs) => Mock.Random.integer(props.min, props.max);
  },
});
SuperSlider.displayName = 'SuperSlider';

export default SuperSlider;
