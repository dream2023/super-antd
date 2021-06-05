import React from 'react'
import type { FC } from 'react'
import { render } from '@testing-library/react'
import { createSuperFormItem, createSuperFormItemWithOptions, SuperForm } from 'super-antd'

const BaseDemo: FC<any> = (props) => {
  return <div>{JSON.stringify(props)}</div>
}

const Demo1 = createSuperFormItem(BaseDemo)
const Demo2 = createSuperFormItemWithOptions(BaseDemo)

const App = () => {
  return <SuperForm isResponsive={false}>
    <Demo1 />
    <Demo2 />
  </SuperForm>
}

test('createSuperFormItem', () => {
  const warpper = render(<App />)
  expect(warpper.container).toMatchSnapshot()
})
