import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { Input, Form } from 'antd'
import { SuperFormDebugger } from 'super-antd'
import userEvent from '@testing-library/user-event';

test('FormDebugger', async () => {
  const wrapper = render(<Form initialValues={{ name: 'foo' }}>
    <Form.Item name="name" label="name">
      <Input />
    </Form.Item>
    <Form.Item name="age" label="age">
      <Input />
    </Form.Item>
    <SuperFormDebugger />
  </Form>)

  userEvent.type(wrapper.getByLabelText('age'), '9');
  await waitFor(() => {
    expect(wrapper.getByLabelText('age')).toHaveValue('9')
    expect(wrapper.container.querySelector('.super-form-debugger')).toHaveTextContent('{ "name": "foo", "age": "9" }')
  })
});