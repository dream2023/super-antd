---
order: 0
group:
  path: /
  title: 开始
nav:
  title: 指南
  path: /guide
  order: 0
---

# 介绍

## 什么 super-antd？

`super-antd` 是一个简单且数据驱动友好的 React 组件库。

它基于 [ant design](https://ant.design/) 和 [pro-components](https://procomponents.ant.design/) 。

## 如何做到简单、易用且强大？

`super-antd` 能做到简单、易用且强大，其核心思想是通过**封装**组件的复杂操作，以**属性**的方式控制其**行为**。

例如，一个表单的操作就可以分为：

- 前期：数据获取和处理；
- 中期：表单的联动和动态配置；
- 后期：表单的提交和数据处理，以及之后的动作（跳转、弹窗、或者是刷新页面）。

通常情况，要实现上述功能，需要些很多的代码和逻辑，但是在 `super-antd` 中仅通过 `SuperForm` 组件的属性就可以实现上述操作：

<code src="./__demos__/basic.tsx" />

针对上述表单操作其处理方式为：

- 前期：通过指定 `initApi` 属性就可以完成数据获取，通过指定一个 `response` 对象就可以完成数据映射；
- 中期：通过指定 `activeOn`、`disabledOn`、`hiddenOn`、`visibleOn` 等就可以完成复杂的联动交互；
- 后期：通过指定 `api`、`redirect`、`resetAfterSubmit` 等就可以完成后期表单提交以及提交后的动作。

通过这样的封装后，大多数复杂的操作，通过简单的属性配置即可实现，实现了真正的高效率和易用性。

## 数据驱动

在上述封装之上，`super-antd` 提供了数据驱动实现，还是上述表单的例子，我们可以这样实现：

<code src="./__demos__/data.tsx" />

这种数据驱动方式，通过 `JSON` 配置就可以生成表单甚至可以做到生成整个页面，对一些需要动态的场景，例如一些审批表单是极其有用的，同时也是低代码和无代码开发的平台的基础。

## 特点

- 完整保留 [ant design](https://ant.design/) 和 [pro-components](https://procomponents.ant.design/) 所有能力；
- 新增各种扩展能力；

## 核心价值

- 极大提升开发效率；
- 极大减少代码复杂度；
- 能够作为数据驱动框架和低代码平台的基础库。

## RoadMap 开发规划

- [x] 0.1 alpha 版
  - [x] [数据模板](https://dream2023.github.io/super-antd/guide/concept/template)
  - [x] [数据联动](https://dream2023.github.io/super-antd/guide/concept/linkage)
  - [x] [数据请求](https://dream2023.github.io/super-antd/guide/concept/api)
  - [x] [schema 动态渲染](https://dream2023.github.io/super-antd/guide/concept/schema)
  - [x] [表单组件](https://dream2023.github.io/super-antd/components/form)
  - [x] [表单项组件](https://dream2023.github.io/super-antd/components/form/form-item)
  - [x] [内置表单组件](https://dream2023.github.io/super-antd/components/form/form-components)
- [ ] 0.1 正式版
  - [ ] 测试覆盖率 80% 以上
  - [ ] 完成 100% 文档
  - [ ] 0️⃣ issue
- [ ] 1.0 版
  - [ ] 模板组件
  - [ ] 富文本组件
  - [ ] 上传图片组件
  - [ ] 上传视频组件
  - [ ] 代码编辑器组件
  - [ ] ...

更详细规划请见 [https://github.com/dream2023/super-antd/projects](https://github.com/dream2023/super-antd/projects)。
