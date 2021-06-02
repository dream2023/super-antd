import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { useUpdate } from 'ahooks';
import React, { FC, useContext } from 'react';
import { SuperForm, SuperFormContext, SuperFormContextProps, withMock, WithMockProps } from 'super-antd'

const Demo: FC<WithMockProps> = (props) => {
  const formContext = useContext<SuperFormContextProps>(SuperFormContext);
  return <div data-testid='mock-rules'>{JSON.stringify(formContext.mockRules)}</div>
}

const DemoWithMock = withMock(Demo, { defaultMockRule: '@string' })

const App: FC<WithMockProps> = (props) => {
  const update = useUpdate();

  return <SuperForm mock>
    <button data-testid='update' onClick={() => update()}>更新</button>
    <DemoWithMock {...props} />
  </SuperForm>
}

describe('withMock', () => {
  test('当 name 为数组时，可以正常 Mock', () => {
    render(<App name={['info', 'name']} />)
    userEvent.click(screen.getByTestId('update'))
    expect(screen.queryByTestId('mock-rules')).toHaveTextContent(JSON.stringify({ 'info.name': '@string' }))
  })

  test('当 name 为字符串时，可以正常 Mock', () => {
    render(<App name="info" />)
    userEvent.click(screen.getByTestId('update'))
    expect(screen.queryByTestId('mock-rules')).toHaveTextContent(JSON.stringify({ 'info': '@string' }))
  })
  test('当 readonly 为 true 时，则无法 Mock', () => {
    render(<App name="info" readonly />)
    userEvent.click(screen.getByTestId('update'))
    expect(screen.queryByTestId('mock-rules')).toHaveTextContent(JSON.stringify({}))
  })
  test('当 hidden 为 true 时，则无法 Mock', () => {
    render(<App name="info" hidden />)
    userEvent.click(screen.getByTestId('update'))
    expect(screen.queryByTestId('mock-rules')).toHaveTextContent(JSON.stringify({}))
  })
  test('当 disabled 为 true 时，则无法 Mock', () => {
    render(<App name="info" disabled />)
    userEvent.click(screen.getByTestId('update'))
    expect(screen.queryByTestId('mock-rules')).toHaveTextContent(JSON.stringify({}))
  })
});