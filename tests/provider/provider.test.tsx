import { getFilters } from '@dream2023/data-mapping';
import { render } from '@testing-library/react';
import axios from 'axios';
import React, { useContext } from 'react';

import { SuperAntdContext, SuperProvider } from 'super-antd';

describe('SuperProvider', () => {
  test('children 可以正常显示', () => {
    const warpper = render(
      <SuperProvider>
        <div data-testid="content">hello world</div>
      </SuperProvider>,
    );
    expect(warpper.getByTestId('content')).toBeInTheDocument();
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

    const warpper = render(
      <SuperProvider axios={axios}>
        <Demo />
      </SuperProvider>,
    );
    expect(warpper.getByTestId('axios')).toHaveTextContent('have');
  });
});
