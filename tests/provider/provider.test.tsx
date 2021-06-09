import { getFilters } from '@dream2023/data-mapping';
import { render } from '@testing-library/react';
import axios from 'axios';
import React, { useContext } from 'react';

import { SuperAntdContext, SuperProvider } from 'super-antd';

describe('SuperProvider', () => {
  test('children 可以正常显示', () => {
    const wrapper = render(
      <SuperProvider>
        <div data-testid="content">hello world</div>
      </SuperProvider>,
    );
    expect(wrapper.getByTestId('content')).toBeInTheDocument();
  });

  test('过滤器 filters', () => {
    const filters = {
      getFoo: () => 'foo',
    };
    render(<SuperProvider filters={filters}></SuperProvider>);
    expect(getFilters()).toBe(getFilters());
  });

  test('axios 相关', () => {
    const Demo = () => {
      const { axios } = useContext(SuperAntdContext);
      return <div data-testid="axios">{axios ? 'have' : 'empty'}</div>;
    };

    const wrapper = render(
      <SuperProvider axios={axios}>
        <Demo />
      </SuperProvider>,
    );
    expect(wrapper.getByTestId('axios')).toHaveTextContent('have');
  });
});
