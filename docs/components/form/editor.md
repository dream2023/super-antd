# 富文本编辑器

`super-antd` 富文本编辑器是基于 [wangeditor](https://www.wangeditor.com/) 和 [wangeditor-for-react](https://github.com/dongggcom/wangeditor-for-react) 实现的，优秀的编辑器有很多，选择它有几个关键的考量：

- 是否在维护：持续维护中 ✅
- 是否能上传本地图片是否简单：简单 ✅
- 是否有现成的集成 React 的方案：有 ✅
- 文件包大小：构建结果 75kb，在编辑中属于较小的 ✅
- 中文支持：中文非常友好 ✅
- 文档：文档简单易读 ✅
- 界面：简洁爽朗 ✅

## 基本使用

<code src="./__demos__/editor/base.tsx" />

## 配置菜单

配置菜单我们推荐其和 `withDefaultProps` 一起使用，这样就可以一次配置，全项目共用，具体参考下面的例子。

<code src="./__demos__/editor/menu.tsx" />

> 更多配置项参考：https://www.wangeditor.com/doc/pages/03-%E9%85%8D%E7%BD%AE%E8%8F%9C%E5%8D%95/01-%E8%87%AA%E5%AE%9A%E4%B9%89%E8%8F%9C%E5%8D%95.html

## 上传图片

<code src="./__demos__/editor/upload.tsx" />

> 更多关于上传图片的配置参见：https://www.wangeditor.com/doc/pages/07-%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87/

## 只读

<code src="./__demos__/editor/readonly.tsx" />

## API

API 参考 [wangeditor](https://www.wangeditor.com/) 和 [wangeditor-for-react](https://github.com/dongggcom/wangeditor-for-react) 即可。
