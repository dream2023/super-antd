import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { FC, useContext } from 'react';

import { InjectedDependencyProps, WithDependencyProps, withDependency } from '@/form-item/src/hoc';
import { SuperForm, SuperFormContext, SuperInput } from 'super-antd';

describe('withDependency', () => {
  const Demo: FC<InjectedDependencyProps> = () => {
    const formContext = useContext(SuperFormContext);
    const { form } = formContext;
    return <div data-testid="data">{JSON.stringify(form?.getFieldsValue())}</div>;
  };

  const DemoWithDependency = withDependency(Demo);

  const App: FC<WithDependencyProps> = ({ linkageFields }) => {
    return (
      <SuperForm isResponsive={false}>
        <SuperInput name="a" label="a"></SuperInput>
        <SuperInput name="b" label="b"></SuperInput>
        <DemoWithDependency linkageFields={linkageFields}></DemoWithDependency>
      </SuperForm>
    );
  };

  test('linkageFields 存在时，当发生变化时，则应该重新渲染', () => {
    render(<App linkageFields="a" />);
    expect(screen.getByTestId('data')).toHaveTextContent(JSON.stringify({}));
    userEvent.type(screen.getByLabelText('a'), '1');
    expect(screen.getByTestId('data')).toHaveTextContent(JSON.stringify({ a: '1' }));
  });

  test('linkageFields 不存在时，当发生变化时，不应该重新渲染', () => {
    render(<App />);
    expect(screen.getByTestId('data')).toHaveTextContent(JSON.stringify({}));
    userEvent.type(screen.getByLabelText('a'), '1');
    expect(screen.getByTestId('data')).toHaveTextContent(JSON.stringify({}));
  });

  test('linkageFields 为数组', () => {
    render(<App linkageFields={['a', 'b']} />);
    expect(screen.getByTestId('data')).toHaveTextContent(JSON.stringify({}));
    userEvent.type(screen.getByLabelText('a'), '1');
    userEvent.type(screen.getByLabelText('b'), '2');
    expect(screen.getByTestId('data')).toHaveTextContent(JSON.stringify({ a: '1', b: '2' }));
  });

  test('linkageFields 存在，但非 linkageFields 字段变化，不应该重新渲染', () => {
    render(<App linkageFields={'b'} />);
    expect(screen.getByTestId('data')).toHaveTextContent(JSON.stringify({}));
    userEvent.type(screen.getByLabelText('a'), '1');
    expect(screen.getByTestId('data')).toHaveTextContent(JSON.stringify({}));
  });
});
