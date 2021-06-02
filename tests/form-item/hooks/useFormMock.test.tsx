import React, { FC, useContext, useState } from 'react';
import { render, screen } from '@testing-library/react'

import { useUpdate } from 'ahooks'
import { getMockRule, useFormMock, FormMockOptions } from '@/form-item/src/hooks/useFormMock'
import { SuperForm, SuperFormContext, SuperFormContextProps, SuperFormProps } from 'super-antd'
import userEvent from '@testing-library/user-event';

const MockRuleDemo: FC<Omit<FormMockOptions, 'formContext' | 'props'>> = (props) => {
  // 表单 context
  const formContext = useContext<SuperFormContextProps>(SuperFormContext);
  useFormMock({ ...props, formContext, props: { min: 0, max: 10 } })
  return <div></div>
}

const MockRuleData = () => {
  // 表单 context
  const formContext = useContext<SuperFormContextProps>(SuperFormContext);
  return <div data-testid='mock-rules'>{JSON.stringify(formContext.mockRules)}</div>
}

const App: FC<{ mock?: SuperFormProps['mock'], demoProps: Omit<FormMockOptions, 'formContext' | 'props'> }> = (props) => {
  const [show, setShow] = useState(true)
  const update = useUpdate();

  return <SuperForm mock={props.mock}>
    <button data-testid='update' onClick={() => update()}>更新</button>
    <button data-testid='remove' onClick={() => setShow(false)}>移除</button>
    {show && <MockRuleDemo {...props.demoProps} />}
    <MockRuleData />
  </SuperForm >
}

describe('withMock', () => {
  test('getMockRule', () => {
    expect(getMockRule('@string', { a: 'a' })).toEqual('@string');
    expect(getMockRule((props: any) => props.min, { min: 0 })).toEqual(0);
  })

  test('form mock 为 true & defaultMockRule 有值，则应新增 defaultMockRule', async () => {
    render(<App mock demoProps={{ name: 'foo', defaultMockRule: '@string' }} />)
    userEvent.click(screen.getByTestId('update'))
    expect(screen.queryByTestId('mock-rules')).toHaveTextContent(JSON.stringify({ foo: '@string' }))
  })

  test('mock 为 true & defaultMockRule 有值，则应新增 defaultMockRule', () => {
    render(<App demoProps={{ name: 'foo', mock: true, defaultMockRule: '@string' }} />)
    userEvent.click(screen.getByTestId('update'))
    expect(screen.queryByTestId('mock-rules')).toHaveTextContent(JSON.stringify({ foo: '@string' }))
  })

  test('mock 为非布尔值 & defaultMockRule 有值，则应新增 mock', () => {
    render(<App demoProps={{ name: 'foo', mock: '@cname', defaultMockRule: '@string' }} />)
    userEvent.click(screen.getByTestId('update'))
    expect(screen.queryByTestId('mock-rules')).toHaveTextContent(JSON.stringify({ foo: '@cname' }))
  })

  test('disabledMock 为 true，则不变', () => {
    render(<App demoProps={{ name: 'foo', mock: '@cname', disabledMock: true, defaultMockRule: '@string' }} />)
    userEvent.click(screen.getByTestId('update'))
    expect(screen.queryByTestId('mock-rules')).toHaveTextContent(JSON.stringify({}))
  })

  test('当 name 不存在，则不变', () => {
    render(<App demoProps={{ mock: '@cname', defaultMockRule: '@string' }} />)
    userEvent.click(screen.getByTestId('update'))
    expect(screen.queryByTestId('mock-rules')).toHaveTextContent(JSON.stringify({}))
  })

  test('当组件卸载时，应删除', () => {
    render(<App demoProps={{ name: 'foo', mock: '@cname' }} />)
    userEvent.click(screen.getByTestId('update'))
    expect(screen.queryByTestId('mock-rules')).toHaveTextContent(JSON.stringify({ foo: '@cname' }))
    userEvent.click(screen.getByTestId('remove'))
    userEvent.click(screen.getByTestId('update'))
    expect(screen.queryByTestId('mock-rules')).toHaveTextContent(JSON.stringify({}))
  })

  test('当 isMock 为 false 卸载时，应删除', () => {
    const res = render(<App demoProps={{ name: 'foo', mock: '@cname' }} />)
    userEvent.click(screen.getByTestId('update'))
    expect(screen.queryByTestId('mock-rules')).toHaveTextContent(JSON.stringify({ foo: '@cname' }))
    res.rerender(<App demoProps={{ name: 'foo', mock: '@cname', disabledMock: true }} />)
    userEvent.click(screen.getByTestId('update'))
    expect(screen.queryByTestId('mock-rules')).toHaveTextContent(JSON.stringify({}))
  })


  test('无 Mock 规则时', () => {
    render(<App mock demoProps={{ name: 'foo' }} />)
    userEvent.click(screen.getByTestId('update'))
    expect(screen.queryByTestId('mock-rules')).toHaveTextContent(JSON.stringify({}))
  })
})