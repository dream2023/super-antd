---
order: 0
group:
  path: /form
  title: 表单
nav:
  title: 组件
  path: /components
  order: 5
---

# SuperForm 表单

表单是 super-antd 中核心组件之一，主要作用是提交或者展示表单数据。

## 数据获取和提交

我们可以通过 `initApi` 属性获取服务器数据，同时可以指定 `api` 作为提交地址，也可以使用参数映射和数据映射，更多关于接口请求的内容可以查看 [API 请求](/guide/concept/api)。

### 数据获取

在将 `initApi` 作为远程获取的地址的同时也可以指定 `initialValues` 作为默认值，二者是一个 `浅合并` 的关系。

<code src="./__demos__/form/data_request.tsx" />

### 数据提交

指定 `api` 作为提交地址，发起提交。

<code src="./__demos__/form/data_submit.tsx" />

### 保留远程数据

当我们从远程获取到 `{id: 1, name: 'Jack'}` 时，表单项中只有 `name` 字段，当提交数据时，ant-design 默认会删除掉 `id` 字段，如果想要保留那么就加上 `preserveRemoteData` 字段即可。

<code src="./__demos__/form/preserveRemoteData.tsx" />

## 数据驱动

`SuperForm` 对数据做了很好的处理，可以与 `SchemaRender` 很好融合。

<code src="./__demos__/form/schema.tsx" />

## 表单和其他组件通信

如果设置了 `updateName` 或者 `refreshName` 既与其他组件通信，例如，我们用将 A 表单数据传递到 B 表单。其中 `updateName` 会更新表单数据， `refreshName` 则会重新请求远程数据。

<code src="./__demos__/form/communication.tsx" />

## labelCol & wrapperCol 增强

### 响应式

labelCol & wrapperCol 会根据父元素的宽度自动设置合适的值，让其无论在大屏、小屏或者弹窗都能应对自如，再也无需你的关心。

这里因为默认开启了响应式，所以增加属性，你可以更改浏览器窗口大小，观察其具体表现。

<code src="./__demos__/form/col_response.tsx" />

如果你不想要响应式，可以自己指定 `labelCol` 和 `wrapperCol` 的值或者使用 `isResponsive={false}` 来禁止响应式。

以下是具体的响应式数据：

```js | pure
{
  sm: { labelCol: 24, wrapperCol: 24 },
  md: { labelCol: 4, wrapperCol: 16 },
  lg: { labelCol: 4, wrapperCol: 14 },
  xl: { labelCol: 3, wrapperCol: 12 },
  xxl: { labelCol: 2, wrapperCol: 10 }
}
```

### 无标签时自动对齐

antd Form 当 `Form.Item` 无 `label` 时，还需要指定其 labelCol 的 `offset` 才能对齐， SuperForm 则无需指定就会自动对齐。

示例中，`SuperCheckbox` 并未指定 `label` ，但依然可以和 `SuperInput` 和 `SuperEmail` 对齐，但是 antd Form 则不齐。

<code src="./__demos__/form/col_align.tsx" />

### 支持数字

`labelCol` 和 `wrapperCol` 增加 `数字形式` 的支持。

<code src="./__demos__/form/col_num.tsx" />

## align 对齐方式

表单除了有 `layout` 这样的布局功能，还可以将表单项 **居中**、**居右**。

> 当居中或者居右时，响应式 label 不起作用。

<code src="./__demos__/form/align.tsx" />

## debug 功能

SuperForm 增加 `debug` 功能，通过 `debug` 属性即可开启。

<code src="./__demos__/form/debug.tsx" />

## 按钮

`SuperForm` 默认显示 `提交` 和 `重置` 两个按钮，我们可以通过属性控制更多按钮行为和样式：

### 更改按钮文本或者样式

<code src="./__demos__/form/btn_style.tsx" />

### 更多按钮

如果仅是 `提交`、`重置` 无法满足你的需求，还可以使用 `extraBtns`。

> 因为是数组，别忘记加 key ~

<code src="./__demos__/form/btn_extra.tsx" />

### 支持对象形式

对于 `submitBtn` 、`resetBtn` 和 `extraBtns` 除了支持字符串形式，还可以使用对象的形式定义按钮，或者 `Button` 实例，甚至是两者混用，例如：

<code src="./__demos__/form/btn_object.tsx" />

### 隐藏按钮

我们只需要给 `resetBtn` 或者 `submitBtn` 设置为 `false`，就可以将其隐藏。

<code src="./__demos__/form/btn_visible.tsx" />

### 按钮对齐方式

按钮默认是 `居左`，当然也可以做到 `居右` 和 `居中`，我们只需要设置 `btn.btnsAlign` 即可。

<code src="./__demos__/form/btn_align.tsx" />

### 完全自定义

<code src="./__demos__/form/btn_render.tsx" />

## 提交后的行为

### 重置表单

通过 `resetAfterSubmit` 属性即可在提交表单后重置表单。

<code src="./__demos__/form/action_reset.tsx" />

### 跳转页面

<code src="./__demos__/form/action_redirect.tsx" />

## 持久化数据

> 警告：此属性必须设置 `name` 属性。

表单默认在重置之后（切换页面、弹框中表单关闭表单），会自动清空掉表单中的所有数据，如果你想持久化保留当前表单项的数据而不清空它，那么配置 `persistData` 属性。

并且默认情况下，提交成功后，会清空该缓存，既 `clearPersistDataAfterSubmit` 默认为 `true`，如果想在提交成功后仍然保留，可以配置 `clearPersistDataAfterSubmit` 为 `false`

<code src="./__demos__/form/persistData.tsx" />

## 全表单禁用

只要在 `SuperForm` 上设置 `disabled` 即可。

<code src="./__demos__/form/disabled.tsx" />

## 全表单只读

只要在 `SuperForm` 上设置 `readonly` 即可。

<code src="./__demos__/form/readonly.tsx" />

## 全局隐藏标签

如果想隐藏所有标签，则可以设置 `hideLabel` 属性。

<code src="./__demos__/form/hideLabel.tsx" />

## 取消自动 placeholder

`SuperFormItem` 会自动添加 `placeholder`，如果不需要这个功能，可以设置 `autoPlaceholder` 为 `false`。

<code src="./__demos__/form/placeholder.tsx" />

## 节流函数时间

为了提升性能，我们可以通过设置 `throttleTimeout` 来调节节流函数的时间。

<code src="./__demos__/form/throttleTimeout.tsx" />

<API src="./__demos__/form/types.tsx"></API>

更多属性请查看 ant-design 的 [Form](https://ant.design/components/form-cn/#API)。

### ServiceMessageType

| Name        | Description            | Type     | Default    |
| ----------- | ---------------------- | -------- | ---------- |
| initSuccess | 初始化数据成功的提示。 | `string` | `--`       |
| initError   | 初始化数据失败的提示。 | `string` | `--`       |
| saveSuccess | 保存数据成功时的提示。 | `string` | `保存成功` |
| saveError   | 保存数据失败时的提示。 | `string` | `--`       |
