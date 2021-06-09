import { render } from '@testing-library/react';
import React from 'react';
import type { FC } from 'react';

import { SuperForm, createSuperFormItem, createSuperFormItemWithOptions } from 'super-antd';

describe('createSuperFormItem', () => {
  const BaseDemo: FC<any> = (props) => {
    return <div>{JSON.stringify(props)}</div>;
  };

  const Demo1 = createSuperFormItem(BaseDemo);
  const Demo2 = createSuperFormItemWithOptions(BaseDemo);

  const App = () => {
    return (
      <SuperForm isResponsive={false}>
        <Demo1 />
        <Demo2 />
      </SuperForm>
    );
  };
  test('createSuperFormItem', () => {
    const wrapper = render(<App />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
