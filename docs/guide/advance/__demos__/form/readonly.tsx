import React from 'react';

import { SuperForm, SuperInput } from 'super-antd';

import SuperQuill from './super-quill';

const App = () => {
  return (
    <SuperForm
      initialValues={{
        description:
          '<p><strong>创意过程的 5 个阶段：</strong></p><ol><li>准备期：开始有意识或者无意识地沉静在有趣或者能唤起好奇心的问题中；</li><li>酝酿期：这个阶段，想法在潜意识里翻腾；</li><li>洞悉或称为“啊哈”时刻：就是阿基米德走出浴室，大声喊“我想出来”的那一刻；</li><li>评价期：人们需要决定自己的东西是否有价值，是否值得继续研究；</li><li>精心制作器：这个阶段也是花费时间最多的，也是最新辛苦的，就是爱迪生所说 1 % + 99% 的汗水。</li></ol>',
      }}
      debug
    >
      <SuperInput name="name" label="姓名" />
      <SuperQuill name="description" label="介绍" readonly />
    </SuperForm>
  );
};

export default App;
