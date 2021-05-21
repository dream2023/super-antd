---
order: 15
group:
  path: /concept
  title: 核心概念
  order: 2
nav:
  title: 指南
  path: /guide
---

# 数据联动

上节我们介绍了数据模板的概念，其中有一项就是实现表单的联动效果，那么本节我们就详细介绍一下联动。

## 表单项联动

在日常的开发中，表单之间的联动最为常见，包括：

- `visibleOn` 联动显示/隐藏：某个条件下显示或隐藏某个表单项组件；
- `disabledOn` 联动启用/禁用：某个条件下禁用或启用某个表单项组件；
- `readonlyOn` 联动只读：某个条件下表单项组件处于只读状态；
- `requiredOn` 联动必填：某个条件下表单项处于必填状态；
- `label` 联动 label：表单项的 label 根据其他表单项变化；
- `placeholder` 联动 placeholder：表单项的 placeholder 根据其他表单项变化；

他们都可以使用 `linkageFields` + 联动函数 或 联动模板数据达到效果。

### 联动方式

联动有两种方式分别为 **联动数据模板** 和 **联动函数**，二者仅在书写上有区别，功能上保持一致。

#### 联动模板数据

联动模板是指联动动作是由 **模板字符串** 形式处理，例如 `visibleOn="{{data.province}}"`，以上的 6 个联动属性都是支持这一特性的。

<code src="./__demos__/linkage/linkage_template.tsx" />

#### 联动函数

联动函数是指联动动作是由 **函数** 形式处理，例如 `visibleOn={(data) => data.province}`，出 `label` 和 `placeholder` 外都支持。

<code src="./__demos__/linkage/linkage_fn.tsx" />

### 联动显示/隐藏

#### 联动显示 `visibleOn`

<code src="./__demos__/linkage/linkage_hidden.tsx" />

#### 联动隐藏 `hiddenOn`

联动隐藏和联动显示逻辑取反，其他并无不同，这里不做举例。

### 联动影响

当表单项从显示变为隐藏时，一般情况下是需要清除当前表单项值，但这并非绝对，所以我们提供了以下属性控制其行为：

- `clearValueAfterDisabled`：当变为禁用时，清除当前表单项的值
- `clearValueAfterReadonly`：当变为只读时，清除当前表单项的值
- `clearValueAfterHidden`：当变为隐藏时，清除当前表单项的值

我们以 `clearValueAfterHidden` 为例：

<code src="./__demos__/linkage/hidden_clear.tsx" />

### 联动启用/禁用

联动启用、禁用用法和联动显示/隐藏完全一样，设计的字段有：

- 联动启用：`linkageFields` + `activeOn`
- 联动禁用：`linkageFields` + `disabledOn`

### 联动只读

用法同上，涉及的字段有：`linkageFields` + `readonlyOn`

### 联动必填

用法同上，涉及的字段有：`linkageFields` + `requiredOn`

### 联动 label

联动 label 仅支持数据模板形式，具体用法如下：

<code src="./__demos__/linkage/linkage_label.tsx" />

### 联动 placeholder

用法同上，涉及的字段有：`linkageFields` + `placeholder`

## options 联动

options 联动是另外一种很常见的场景，查看下面这个例子：

<code src="./__demos__/linkage/linkage_options_basic" />

上面例子我们实现了这个逻辑：每次选择**类型**的时候，会触发**类型列表**的 options 接口重新请求，并返回不同的下拉选项。

更多用法参见 [options 用法](/guide/concept/options)。

## 任意组件间联动

联动很可能会出现跨组件的形式，例如有一个 Form 组件，一个 Table 组件，Form 的搜索提交会使得 Table 组件刷新，而 Table 和 Form 是同级关系或者深层次关系，这个时候，上述表单间的联动就不起作用了，那么我们就需要任意组件之间的联动。

任意组件之间的联动，我们抽象为了：

- **刷新目标组件数据**：也就是会导致目标组件重新请求数据
- **发送数据到目标组件**：也就是将自己的数据发送到目标组件，具体目标组件怎么用看内部的实现。

目前内部实现了上述功能的组件暂时只有 `SuperForm`。

### 发送数据到目标数据

<code src="./__demos__/linkage/communication_data.tsx" />

### 刷新目标数据

<code src="./__demos__/linkage/communication_refresh.tsx" />
