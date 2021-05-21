import { Form } from 'antd';
import React from 'react';

export const SuperFormDebugger = () => {
  return (
    <Form.Item noStyle shouldUpdate>
      {(form) => (
        <pre className="super-form-debugger">
          <code>{JSON.stringify(form.getFieldsValue(), null, 2)}</code>
        </pre>
      )}
    </Form.Item>
  );
};

export default SuperFormDebugger;
