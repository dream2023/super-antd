---
order: 3
group:
  path: /hoc
  title: 高阶组件
nav:
  title: 组件
  path: /components
  order: 5
---

# withDefaultProps

用于给组件增加默认值。

## 代码演示

### 基础用法

<code src="./__demos__/withDefaultProps/basic.tsx" />

### 可覆盖默认值

<code src="./__demos__/withDefaultProps/override.tsx" />

## API

```tsx | pure
const ComponentWithDefaultProps = withDefaultProps<T extends object = any>(
  Component: React.ComponentType<T>,
  props: T
);
```

### Params

| 参数      | 说明         | 类型                  | 默认值 |
| --------- | ------------ | --------------------- | ------ |
| component | React 组件   | `React.ComponentType` | -      |
| props     | 此组件的属性 | `object`              | -      |
