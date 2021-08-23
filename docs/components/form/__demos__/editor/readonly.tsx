import React from 'react';

import { SuperEditor, SuperForm, SuperInput } from 'super-antd';

const App = () => {
  return (
    <SuperForm
      debug
      readonly
      initialValues={{
        name: 'jack',
        description:
          '<blockquote><p>世界上只有一种真正的英雄主义，那就是看清生活的真相之后，依然热爱生活。 --<strong style="font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;">罗曼罗兰</strong></p></blockquote>',
      }}
    >
      <SuperInput name="name" label="姓名" />
      <SuperEditor name="description" label="介绍" />
    </SuperForm>
  );
};

export default App;
