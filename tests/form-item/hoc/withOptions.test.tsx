import { ProFormDependency } from '@ant-design/pro-form';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React, { FC, useState } from 'react';

import {
  OptionsType,
  SuperForm,
  SuperInput,
  SuperProvider,
  SuperSelect,
  WithOptionsConfigType,
  WithOptionsProps,
  withOptions,
} from 'super-antd';

describe('withOptions', () => {
  const Demo: FC<{ options?: OptionsType; loading?: boolean; optionsProp?: object; data?: any }> = (props) => {
    return <div data-testid="data">{JSON.stringify(props)}</div>;
  };

  const App: FC<WithOptionsConfigType & WithOptionsProps> = ({ hasLoadingProp, needData, ...resetProps }) => {
    const DemoWithOptions = withOptions(Demo, { hasLoadingProp, needData });
    return (
      <SuperForm isResponsive={false}>
        <SuperInput name="a" label="a"></SuperInput>
        <ProFormDependency name={['a']}>
          {(data, form) => (
            // 注入 data 和 form 属性
            <DemoWithOptions form={form} data={data} {...resetProps}></DemoWithOptions>
          )}
        </ProFormDependency>
      </SuperForm>
    );
  };

  const toBe = (data: any) => expect(screen.getByTestId('data')).toHaveTextContent(JSON.stringify(data));

  const resOptions = [
    { label: 'a', value: 1 },
    { label: 'b', value: 2 },
  ];

  test('正常数组，正常渲染', () => {
    render(<App options={resOptions} />);
    toBe({ options: resOptions });
  });

  test('需要转换的数据', () => {
    render(
      <App
        options={[
          { name: 'a', id: 1 },
          { name: 'b', id: 2 },
        ]}
        optionsProp={{ labelKey: 'name', valueKey: 'id' }}
      />,
    );
    toBe({ options: resOptions });
  });

  test('远程 & 有 loading', async () => {
    render(
      <SuperProvider axios={axios}>
        <App hasLoadingProp={true} options={() => resOptions} />
      </SuperProvider>,
    );
    toBe({ options: [], loading: true });
    await waitFor(() => {
      toBe({ options: resOptions });
    });
  });

  test('远程 & 无 loading', async () => {
    render(
      <SuperProvider axios={axios}>
        <App options={() => resOptions} />
      </SuperProvider>,
    );
    toBe({ options: [] });
    await waitFor(() => {
      toBe({ options: resOptions });
    });
  });

  test('需要 data', () => {
    render(
      <App
        needData
        options={[
          { name: 'a', id: 1 },
          { name: 'b', id: 2 },
        ]}
        optionsProp={{ labelKey: 'name', valueKey: 'id' }}
      />,
    );
    toBe({ options: resOptions, data: {}, optionsProp: { labelKey: 'name', valueKey: 'id' } });
  });

  test('更改 options 后，删除值', async () => {
    const App = () => {
      const [options, setOptions] = useState<string[]>(['a', 'b']);
      return (
        <SuperForm initialValues={{ foo: 'a' }} isResponsive={false}>
          <SuperSelect name="foo" label="foo" clearValueAfterOptionsChange options={options} />
          <button onClick={() => setOptions(['c', 'd'])} data-testid="btn">
            click
          </button>
        </SuperForm>
      );
    };
    const res = render(<App />);
    expect(res.container.querySelector('.ant-select-selection-item')).toHaveTextContent('a');
    userEvent.click(screen.getByTestId('btn'));
    await waitFor(() => {
      expect(res.container.querySelector('.ant-select-selection-item')).toBeNull();
    });
  });
});
