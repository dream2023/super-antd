<h1 align="center">super-antd</h1>
<div align="center">

[![Codecov](https://img.shields.io/codecov/c/github/dream2023/super-antd?token=BKaeenZ4wi)](https://codecov.io/gh/dream2023/super-antd) [![GitHub Discussions](https://img.shields.io/github/discussions/dream2023/super-antd?label=吐槽/讨论)](https://github.com/dream2023/super-antd/discussions) [![文档](https://img.shields.io/static/v1?label=Docs&message=文档&color=blue)](https://dream2023.github.io/super-antd) [![GitHub Repo stars](https://img.shields.io/github/stars/dream2023/super-antd)](https://github.com/dream2023/super-antd) [![star](https://gitee.com/dream2023/super-antd/badge/star.svg?theme=dark)](https://gitee.com/dream2023/super-antd)

[![npm](https://img.shields.io/npm/v/super-antd)](https://www.npmjs.com/package/super-antd) [![npm](https://img.shields.io/npm/dt/super-antd)](https://www.npmjs.com/package/super-antd) [![David](https://img.shields.io/david/dream2023/super-antd)](https://github.com/dream2023/super-antd) [![GitHub top language](https://img.shields.io/github/languages/top/dream2023/super-antd)](https://github.com/dream2023/super-antd) [![github pages](https://github.com/dream2023/super-antd/actions/workflows/release.yml/badge.svg)](https://github.com/dream2023/super-antd/actions/workflows/release.yml)

</div>

`super-antd` 是一个简单且数据驱动友好的 React 组件库。它基于 [ant design](https://ant.design/) 和 [pro-components](https://procomponents.ant.design/) 。

## 📖 Document

[https://dream2023.github.io/super-antd](https://dream2023.github.io/super-antd)

## 🤔 Why？

让我开发此组件库的核心原因有两点：

- 市面上没有让我觉得满意的真正足够简单、组件足够多的组件库
- 低代码的解决方案，人们往往在上层进行各种骚操作，导致大部分低代码平台都面临者扩展性差、灵活度低的问题

## ✨ Feature

- 🚀 开发提效：通过对大量业务场景进行封装，使得提效明显；
- 👬 数据驱动友好：在组件层级解决了动态渲染、通信、联动等难题；
- 💪 稳定：Typescript 编写 + 90% 以上的测试覆盖率；
- 👍 侵入性低：它只是一个组件库，你可以全部使用，也可以部分使用，可以用 schema 的形式，也可以用正常组件的形式。

## 🎯 RoadMap

- [x] 0.1 alpha 版
  - [x] [数据模板](https://dream2023.github.io/super-antd/guide/concept/template)
  - [x] [数据联动](https://dream2023.github.io/super-antd/guide/concept/linkage)
  - [x] [数据请求](https://dream2023.github.io/super-antd/guide/concept/api)
  - [x] [schema 动态渲染](https://dream2023.github.io/super-antd/guide/concept/schema)
  - [x] [表单组件](https://dream2023.github.io/super-antd/components/form)
  - [x] [表单项组件](https://dream2023.github.io/super-antd/components/form/form-item)
  - [x] [内置表单组件](https://dream2023.github.io/super-antd/components/form/form-components)
- [x] 0.1 正式版
  - [x] 测试覆盖率 90% 以上
  - [x] 完成 100% 文档
  - [x] 0️⃣ issue
- [ ] 1.0 版
  - [x] 上传图片组件
  - [x] 富文本组件
  - [x] 上传视频组件
  - [x] 无限级联组件
  - [x] 百度地图组件
  - [x] 高德地图组件
  - [x] 代码编辑器组件
  - [ ] 模板组件
  - [ ] ...

更详细规划请见 [https://github.com/dream2023/super-antd/projects](https://github.com/dream2023/super-antd/projects)。

## 👬 Ecosystem

其实 `super-antd` 仅是一个大系统中的一部分，我个人是希望做一个支 **持海量组件的高扩展通用型** 的低代码平台，此平台包括以下组件部分：

| Project | Status | Description |
| --- | --- | --- |
| react-schema-render | ![react-schema-render](https://img.shields.io/npm/v/react-schema-render?style=flat-square) | 通用型 schema 转 React 组件的工具组件 |
| antd-image-cropper | ![antd-image-cropper](https://img.shields.io/npm/v/antd-image-cropper?style=flat-square) | ant design 图片裁剪组件 |
| @dream2023/data-mapping | ![@dream2023/data-mapping](https://img.shields.io/npm/v/@dream2023/data-mapping?style=flat-square) | 数据模板映射方案 |
| super-antd | ![super-antd](https://img.shields.io/npm/v/super-antd?style=flat-square) | 简单且数据驱动友好的 React 组件库 |

此外至少还有以下系统待开发：

- 基于 `super-antd` 属性面板系统（时间点：组件库发布 0.3 版后）
- 组件库无关的低代码编辑器（时间点：属性面板完成后）
- 一个开放性的组件市场（时间点：低代码编辑器完成后）

虽然要做的东西很多，但整体思路还是很清晰的，期待都实现的一天。

## support

开源不易，如果你觉得项目对自己和公司有用，请跳转到 [gitee](https://gitee.com/dream2023/super-antd#Support) 底部进行打赏，并且可以多留言鼓励作者一下，你的支持就是我更新的动力！

[![reward](./reward.png)](https://gitee.com/dream2023/super-antd#support)
