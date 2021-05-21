---
order: 1
group:
  path: /form
  title: 表单
nav:
  title: 组件
  path: /components
  order: 5
---

# 表单项通用属性

SuperFormItem 是在 antd [Form.Item](https://ant.design/components/form-cn/#Form.Item) 和 [ProFormFields](https://procomponents.ant.design/components/field-set) 基础上，结合了具体的表单内容组件而成。

这些组件本质上是 `Form.Item` 和组件自身的结合，可以简单理解为：

```jsx | pure
const SuperInput = (props) => {
  return (
    <ProForm.Item {...props}>
      <Input {...props.fieldProps} />
    </ProForm.Item>
  );
};
```

其中 `fieldProps` 才是组件自身的属性，要切记。

## 基本使用

<code src="./__demos__/form-item/basic.tsx" />

## wrapperCol & labelCol 支持数字

`wrapperCol` 和 `labelCol` 属性扩展了支持数字的能力。

<code src="./__demos__/form-item/col.tsx" />

## 隐藏 label

<code src="./__demos__/form-item/hideLabel.tsx" />

## 联动

在日常的开发中，表单之间的联动最为常见，包括：

- `visibleOn` 联动显示/隐藏：某个条件下显示或隐藏某个表单项组件；
- `disabledOn` 联动启用/禁用：某个条件下禁用或启用某个表单项组件；
- `readonlyOn` 联动只读：某个条件下表单项组件处于只读状态；
- `requiredOn` 联动必填：某个条件下表单项处于必填状态；
- `label` 联动 label：表单项的 label 根据其他表单项变化；
- `placeholder` 联动 placeholder：表单项的 placeholder 根据其他表单项变化；

他们都可以使用 `linkageFields` + 联动函数 或 联动模板数据达到效果。

具体示例，在 [数据联动](/guide/concept/linkage#%E8%A1%A8%E5%8D%95%E9%A1%B9%E8%81%94%E5%8A%A8) 章节已有详细描述，这里就不做重复说明。

## name 属性支持 . 操作

示例中的 `user.name` 会被转为 `["user", "name"]` 符合 `NamePath` 类型。

<code src="./__demos__/form-item/name.tsx" />

<API src="./__demos__/form-item/types.tsx"></API>

更多属性请查看 ant-design 的 [Form.Item](https://ant.design/components/form-cn/#Form.Item)。
