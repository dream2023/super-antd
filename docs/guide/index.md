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
- 中期：通过指定 `activeOn`、`disabledOn`、`hiddenOn`、`visibleOn`、`mock` 等就可以完成复杂的联动交互和数据模拟；
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

## Roadmap 开发规划

#### 预览版

**任务**：

- 1、框架基础；
- 2、表单和表单项组件；

**目标**：打下框架基础，并且确定开发流程、文档书写规范、测试用例等基础。

**实时任务**：[https://github.com/dream2023/super-antd/projects/1](https://github.com/dream2023/super-antd/projects/1)

#### 0.1 版本（表单基础版）

**任务**：

- 1、框架基础；
- 2、表单和表单项组件；
- 3、antd 内置表单组件（select/checkbox/date/radio/number/slider/….）；

**目标**：能够将其已有能力应用到生产环境。

#### 0.2 版(表单增强版)

**任务**：增加各种扩展的表单组件。

**例如**：富文本组件、地图组件、上传组件、代码编辑器组件…

**目标**：覆盖 95% 表单组件场景。

#### 0.3 版(表单关联版)

**任务**：增加各种与表单关联的组件。

**例如**： Dialog 弹窗组件、Tabs 选项卡组件等。

**长远规划**

- 0.4 版：Table 表格组件、Table + Form 组件；
- 0.5 版：Page 组件；
- 0.6 版：图标类组件；
- …
