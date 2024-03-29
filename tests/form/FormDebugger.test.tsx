import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Input } from 'antd';
import React from 'react';

import SuperFormDebugger from '@/form/src/FormDebugger';

test('FormDebugger', async () => {
  const wrapper = render(
    <Form initialValues={{ name: 'foo' }}>
      <Form.Item name="name" label="name">
        <Input />
      </Form.Item>
      <Form.Item name="age" label="age">
        <Input />
      </Form.Item>
      <SuperFormDebugger />
    </Form>,
  );

  userEvent.type(wrapper.getByLabelText('age'), '9');
  await waitFor(() => {
    expect(wrapper.getByLabelText('age')).toHaveValue('9');
    expect(wrapper.container.querySelector('.super-form-debugger')).toHaveTextContent('{ "name": "foo", "age": "9" }');
  });
});
