---
order: 4
group:
  path: /form
  title: 表单组件
nav:
  title: 组件
  path: /components
  order: 5
---

# chain-select 无限级联组件

无限级联组件通过搭配 [options](/form/components/options) 远程加载的能力，可以根据返回结果判断是否还有下一级，从而实现无限级联。

## 基本使用

<code src="./__demos__/chain-select/base.tsx">

## 只读

<code src="./__demos__/chain-select/readonly.tsx">

## 请求参数说明

为了帮助后端接口获取当前选择器状态，我们在请求使会给接口增加两个参数，分为为：

```ts
{
  level: number, // 当前选择器的层级，从 1 开始
  parent_id: any, // 上一级选项的值，如果是第一级选择器，则为 null
}
```
