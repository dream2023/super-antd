---
order: 1
group:
  path: /
  title: 开始
  order: 1
nav:
  title: 指南
  path: /guide
---

# 快速开始

> 因为 `super-antd` 是基于 [ant design](https://ant.design/) 和 [pro-components](https://procomponents.ant.design/) 的，所以在使用之前还是建议你去看看两者的官网。

## 安装

```bash
yarn add antd # 安装 antd
yarn add @ant-design/pro-form # 安装 ProComponents
yarn add super-antd # 安装 super-antd
```

```bash
npm install antd --save
npm install @ant-design/pro-form --save
npm install super-antd --save
```

如果你的网络环境不佳，推荐使用 [cnpm](https://github.com/cnpm/cnpm) 或者 [tyarn](https://www.npmjs.com/package/tyarn)。

## 在项目中使用

### 引入样式

```js | pure
import 'antd/dist/antd.css';
import '@ant-design/pro-form/dist/form.css';


// 或
import 'antd/dist/antd.less';
import '@ant-design/pro-form/dist/form.less';
```

如果使用 less，可以方便进行主题自定义，也可以做到按需加载。

### 使用组件

```jsx
import React from 'react';
import { SuperForm, SuperInput } from 'super-antd';
const App = () => {
  return (
    <SuperForm>
      <SuperInput name="name" label="姓名" />
    </SuperForm>
  );
};
export default App;
```

## 按需加载

`super-antd` 的 JS 代码默认支持基于 ES modules 的 tree shaking，你无需做任何其他处理。
