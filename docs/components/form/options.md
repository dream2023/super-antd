---
order: 2
group:
  path: /form
  title: 表单组件
nav:
  title: 组件
  path: /components
  order: 5
---

# Options 选项列表

因为 `SuperSelect`、`SuperCheckbox` 和 `SuperRadio` 等都有 `options` 选项，所以这里单独抽离出来讲解。

## Options 参数类型

### 对象数组

options 支持普通的 `{label: string, value: any}` 的数组。

<code src="./__demos__/options/obj_arr.tsx" />

### 普通数组

options 支持类似 `['Go', 'Javascript', { label: 'Python', value: 'Python' }]` 这样的数组，其中 `string` 和 `number` 类型的值会被转换 `label` 和 `value` 相同的值的对象，例如 `Go` 会被转为 `{ label: "Go", value: "Go" }`。

<code src="./__demos__/options/common_arr.tsx" />

### API 类型

options 最大的特点是支持 API 类型，这样我们就可以直接请求服务端数据，而 API 类型又分为 API **字符串**、**对象**和**函数**，具体可以看 [API 请求](/guide/concept/api) 章节。

<code src="./__demos__/options/api.tsx" />

## optionsProp Key 映射

我们从服务端获取到的数据通常是需要做一次 `map` 转换的，例如从远程获取到的数据为 `[{ id: 1, name: '马克' }, { id: 2, name: '冉冰' }]` 我们需要转为 `[{value: 1, label: '马克'}, {value: 2, label: '冉冰'}]`，幸运的是，我们提供了更加简单的处理方式，只需要指定 `optionsProp` 为 `{ labelKey: 'name', valueKey: 'id' }` 即可。

<code src="./__demos__/options/optionsProp.tsx" />

## 联动

options 同样支持表单之间的联动，例如，省份列表会导致城市列表的重新获取。

### 基础联动

<code src="./__demos__/options/linkage.tsx" />

### 联动隐藏后清除值

当选项重新获取后，我们发现以选择的值并非发生变化，这通常是不符合实际需求的，我们可以通过 `clearValueAfterOptionsChange` 在 options 改变后清空当前表单项的值。

<code src="./__demos__/options/clear_value.tsx" />

<API src="./__demos__/options/types.tsx"></API>
