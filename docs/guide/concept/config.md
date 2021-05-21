---
order: 20
group:
  path: /concept
  title: 核心概念
  order: 2
nav:
  title: 指南
  path: /guide
---

# 全局配置

对于[数据请求](/guide/concept/api)、[组件间通信](/guide/concept/linkage#%E4%BB%BB%E6%84%8F%E7%BB%84%E4%BB%B6%E9%97%B4%E8%81%94%E5%8A%A8)、[schema 渲染](/guide/concept/schema)、[Mock 数据](/components/form#%E6%95%B0%E6%8D%AE-mock) 等都需要进行相应的配置方可生效，本篇文章会简要介绍相应的配置项，具体使用说明请点击上述链接进行学习。

## 说明

本文所讲述的配置都是基于 `SuperProvider` 组件进行配置，它的使用方式也很简单，就是用 `SuperProvider` 包裹祖先组件，并且传递过去应有的属性：

```jsx | pure
import { SuperProvider } from 'super-antd';

ReactDOM.render(
  <SuperProvider>
    <App />
  </SuperProvider>,
  document.getElementById('root'),
);
```

## 组件通信

任意组件间的通信，无任何配置项，仅需引入`SuperProvider` 组件即可：

```jsx | pure
import { SuperProvider } from 'super-antd';

ReactDOM.render(
  <SuperProvider>
    <App />
  </SuperProvider>,
  document.getElementById('root'),
);
```

详细用法见 [任意组件间联动](/guide/concept/linkage#%E4%BB%BB%E6%84%8F%E7%BB%84%E4%BB%B6%E9%97%B4%E8%81%94%E5%8A%A8)。

## API 请求

api 请求涉及三个配置项，分别为：

| 参数          | 说明         | 类型                                                    | 默认值 |
| ------------- | ------------ | ------------------------------------------------------- | ------ |
| axios         | Axios 实例   | `(options: any) => Promise<any>`                        | -      |
| errorNotify   | 请求错误通知 | `((msg?: string, error?: Error, params?: any) => void)` | -      |
| successNotify | 请求成功通知 | `((msg?: string, data?: any, params?: any) => void)`    | -      |

详细用法见 [API 请求](/guide/concept/api)。

### axios

axios 为 Axios 实例，例如：

```jsx | pure
import { SuperProvider } from 'super-antd';

// 1.创建 axios 实例（具体内容，要根据项目的实际情况）
const axiosInstance = axios.create({});
axiosInstance.interceptors.response.use(
  function ({ data }) {
    return data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

ReactDOM.render(
  // 2.配置 axios，即可
  <SuperProvider axios={axiosInstance}>
    <App />
  </SuperProvider>,
  document.getElementById('root'),
);
```

### errorNotify 和 successNotify

super-antd 默认的提示方式是通过 antd 的 [notification](https://ant.design/components/notification-cn/) 组件实现，其会在浏览器的右侧弹出错误信息或者正确信息。

考虑到用户公司不是以这种方式提示，我们可用过这两个配置项进行个性化定制。

```tsx | pure
import { ErrorNotifyType, SuccessNotifyType, SuperForm, SuperInput, SuperProvider } from 'super-antd';

// 0. axios 是必须的
import axiosInstance from './axios-instance';

// 1.定义请求成功处理函数
const successNotify: SuccessNotifyType = (msg?: string) => {
  if (msg) {
    message.success(msg);
  }
};

// 2.定义请求失败处理函数
const errorNotify: ErrorNotifyType = (msg?: string, error?: Error) => {
  message.error(msg || error?.message);
};

ReactDOM.render(
  // 3.传递配置
  <SuperProvider axios={axiosInstance} errorNotify={errorNotify} successNotify={successNotify}>
    <App />
  </SuperProvider>,
  document.getElementById('root'),
);
```

## schema 渲染

schema 渲染涉及配置项有：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| components | 组件映射关系 | `Record<string, ComponentType<any>>` | - |
| componentProps | 组件默认属性 | `Record<string, Record<any, any>>` | - |
| parsers | 自定义解析器 | `((schema: Record<any, any>, context: SchemaRenderContextProps) => any)[]` | - |
| componentDecorator | 自定义装饰器 | `({children, schema, context}) => ReactElement<any, any>;` | - |

### components

在 schema 渲染时，我们需要首先建立组件的映射关系，当真正渲染时，从这个映射关系中寻找相应的组件进行真实渲染，更多说明 [schema 章节](./schema)。

```tsx | pure
import { SuperForm, SuperInput, SuperProvider, SuperRender } from 'super-antd';

// 1.建立映射关系，之后遇到 `form` 就会渲染 `SuperForm` 组件，遇到 `input` 会渲染 `SuperInput` 组件
const components = {
  form: SuperForm,
  input: SuperInput,
};

ReactDOM.render(
  // 2.传递配置
  <SuperProvider components={components}>
    <App />
  </SuperProvider>,
  document.getElementById('root'),
);
```

### componentProps

componentProps 属性是默认属性配置，当匹配到相应的相应组件时，会应用默认属性，更多说明 [schema 章节](./schema)。

```tsx | pure
import { SuperForm, SuperInput, SuperNumber, SuperProvider, SuperRender } from 'super-antd';

// 0.建立组件映射关系
const components = {
  form: SuperForm,
  input: SuperInput,
  number: SuperNumber,
};

// 1、定义组件默认属性
const componentProps = {
  number: {
    // 所有使用到 SuperNumber 的地方都会有 min={0} 这样的默认属性
    min: 0,
  },
};

ReactDOM.render(
  // 2.传递配置
  <SuperProvider components={components} componentProps={componentProps}>
    <App />
  </SuperProvider>,
  document.getElementById('root'),
);
```

### parsers 和 componentDecorator

当我们需要自定义从 schema 到组件的解析过程时，就需要使用到 `parsers` 属性，更多说明可以参考 [自定义解析器](https://dream2023.gitee.io/react-schema-render/parser)

当我们需要对 schema 组件做一定包裹时，就需要用到 `componentDecorator` 属性，更多说明可以参考 [自定义装饰器](https://dream2023.gitee.io/react-schema-render/decorator)

## Mock 数据

Mock 数据仅涉及一个配置项：

| 参数   | 说明        | 类型     | 默认值 |
| ------ | ----------- | -------- | ------ |
| mockjs | Mockjs 对象 | `Mockjs` | -      |

`super-antd` 假设并非全部人都会使用到 `mock 数据` 功能，如果将其作为内置模块，将会使得打包体积增加，故所谓配置项，更多说明参见 [Mock 数据](/components/form#%E6%95%B0%E6%8D%AE-mock) 。

```jsx | pure
import { Super
import mockjs from 'mockjs';
import { SuperProvider } from 'super-antd';
ReactDOM.render(
  / 2.配置 mockjs
  <SuperProvider mockjs={mockjs}>
    <App />
  </SuperProvider>,
  document.getElementById('root'),
);
```

## 数据模板

数据模板涉及配置项有：

| 参数       | 说明   | 类型                       | 默认值         |
| ---------- | ------ | -------------------------- | -------------- |
| filters    | 过滤器 | `Record<string, Function>` | -              |
| delimiters | 分隔符 | `[string, string]`         | `['{{', '}}']` |

更多用法参见 [数据模板](/guide/concept/template)。

### filters

当内置的过滤器无法满足需求的时候，我们可以自定义的一些过滤器。

```tsx | pure
import { SuperProvider } from 'super-antd';

// 1、下划线转换驼峰
function toHump(val: unknown) {
  if (typeof val === 'string') {
    return val.replace(/\_(\w)/g, function (all: any, letter: string) {
      return letter.toUpperCase();
    });
  }
  return val;
}

// 2.定义 filters 对象
const filters = {
  toHump,
};

ReactDOM.render(
  // 3.配置 filters
  <SuperProvider filters={filters}>
    <App />
  </SuperProvider>,
  document.getElementById('root'),
);
```

### delimiters

数据模板默认的分隔符为 `{{}}`，我们可以通过 `delimiters` 转为 `${}` 或其他的形式。

```tsx | pure
import { SuperProvider } from 'super-antd';

// 1.定义 delimiters
const delimiters: [string, string] = ['${', '}'];

ReactDOM.render(
  // 2.配置 delimiters
  <SuperProvider delimiters={delimiters}>
    <App />
  </SuperProvider>,
  document.getElementById('root'),
);
```
