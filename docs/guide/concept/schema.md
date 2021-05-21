---
order: 18
group:
  path: /concept
  title: 核心概念
  order: 2
nav:
  title: 指南
  path: /guide
---

# 数据驱动

`super-antd` 作为数据驱动友好、低代码友好的组件库，支持通过 `schema` 的方式去渲染组件内容。

## 介绍

### 什么是 Schema？

`Schema` 对象其实就是普通 JS 对象，但是有一定的约束，其和具体的前端框架无关，无论是 `React` 还是 `Vue` 都是可以实现的。

### 什么是数据驱动？

所谓数据驱动就是将 `Schema` 对象转为 `React` 组件（如果是 Vue 的实现，就转为 Vue 组件）。

### 什么是数据驱动友好、低代码友好？

所谓数据驱动友好指：

- 数据通信属性化：通过组件封装，以属性的方式控制组件间的通信，而不是一堆代码逻辑
- 减少函数类型属性：通过封装减少函数类型的属性值，毕竟在配置界面上写函数是很糟糕的体验
- 行为属性化：通过封装减少组件行为的代码逻辑，比如刷新页面、请求接口、跳转等

因为在数据驱动的场景下，通常需要将这些数据存储到数据库，而函数类型的值并不利于存储和应用，而且大多数情况下是通过界面配置实现组件的功能，这就要求了如果想要做好，做灵活，就需要尽可能实现上述三者。

例如 `SuperForm` 组件，在点击 **请求数据** 成功后需要进行 **跳转** 页面的操作，这里的 **请求数据** 和 **跳转页面**，在我们使用其他组件库时，就需要书写不少代码，但是在 `SuperForm` 中我们仅需要执行 `api` 属性和 `rediect` 属性即可：

<code src="./__demos__/schema/schema.tsx" />

## 如何实现？

`super-antd` 的实现数据驱动的能力，其实就是 [react-schema-render](https://dream2023.gitee.io/react-schema-render) 基础上扩展了 [默认值插件](#支持默认属性)、[远程加载](#动态渲染内容)和 [className 增强](#classname) 的能力，同时因为 `super-antd` 是一个数据驱动友好的 UI 库，所以两者可以实现完美的融合。

### react-schema-render 介绍

`react-schema-render` 是一个通用型 schema 转 React 的工具组件，其遵守 [Schema To React 规范](https://dream2023.gitee.io/react-schema-render/standard)。

它具有以下特点：

- 体积小：仅 3kb；
- 功能强：支持[数组解析、深度嵌套、混合渲染](https://dream2023.gitee.io/react-schema-render/usage)等；
- 扩展性高：支持自定义[解析器](https://dream2023.gitee.io/react-schema-render/parser)、[装饰器](https://dream2023.gitee.io/react-schema-render/decorator)；
- 侵入性低：无需对已有组件做任何更改即可接入；
- 稳定性高：测试覆盖率 100%。

更多介绍可以查看其 [官方文档](https://dream2023.gitee.io/react-schema-render/) 和 [Schema To React 规范](https://dream2023.gitee.io/react-schema-render/standard)。

## 如何使用的？

### 基本使用

<code src="./__demos__/schema/basic.tsx" />

### 动态渲染内容

`SuperRender` 相对于 `react-schema-render` 增加了支持通过接口加载 `schema 对象`，然后再渲染成组件，例如远程加载 [form 表单](https://www.fastmock.site/mock/3bff4788a9dad8a803681a2bca5f9cae/api/form)

<code src="./__demos__/schema/remote.tsx" />

最后需要说明的是 `schemaApi` 和 `children` 属性不能够并存，如果并存，`schemaApi` 会 **覆盖** `children` 属性。

### 支持默认属性

对于某些组件，例如 `Upload` 组件，其上传地址，也就是 `action` 属性在一个公司一般是统一的，我们没必要重复设置相同参数，所以才诞生了此功能。

为了更直观的演示，我们以 `SuperNumber` 组件为例，全局设置其最小值为 `0`，代码如下：

<code src="./__demos__/schema/attrs.tsx" />

### className

react 中 className 仅支持字符串，但是在 `SuperRender` 中，通过自定义解析器和 [classnames](https://www.npmjs.com/package/classnames) 库，让其能书写对象或者数组。

<code src="./__demos__/schema/className.tsx" />
