---
order: 13
group:
  path: /concept
  title: 核心概念
  order: 2
nav:
  title: 指南
  path: /guide
---

# 数据模板

数据模板通过 `{{xxx}}` 的方式获取当前作用域中某个变量的值，实现灵活配置的功能，主要用于 [数据联动](/guide/concept/linkage) 、[API 请求](/guide/concept/api) 等场景。

其内部主要使用到了 [@dream2023/data-mapping](https://gitee.com/dream2023/data-mapping) 库，基本原理同 [vue filters](https://cn.vuejs.org/v2/guide/filters.html) 。

## 联动取值

我们可以通过数据模板动态设置 `placeholder` 以及字段的显示：

<code src="./__demos__/template/linkage.tsx" />

## 支持链式取值

可以使用 `.` 进行链式取值。

<code src="./__demos__/template/chain.tsx" />

## API 请求和响应

我们可以在 `api.response`、`api.data`、`api.params` 中使用数据模板的能力，具体如下：

<code src="./__demos__/template/api.tsx" />

## 自定义分隔符

数据模板默认的分隔符为 `{{}}`，同时支持自定义分隔符，例如将其定义为 `${}`

<code src="./__demos__/template/delimiters.tsx" />

## 表达式

`{{}}` 内不仅可以书写 `data.xxx` 变量，还支持 JS 表达式，例如：

<code src="./__demos__/template/filters_expression.tsx" />

## 过滤器

过滤器是对数据映射的一种增强，它的作用是对获取数据做一些处理，基本用法如下：

```text
{{ data | filterA | filterB }}
```

### 基础使用

<code src="./__demos__/template/filters_basic.tsx" />

### JS 全局函数

数据模板可以使用到 JS 的全局函数，例如 `JSON.stringify` 或者 `parseInt` 等函数，例如：

<code src="./__demos__/template/filters_global.tsx" />

### 串联使用多个过滤器

<code src="./__demos__/template/filters_multi.tsx" />

### 自定义过滤器

<code src="./__demos__/template/filters_custom.tsx" />

## 内置过滤器

super-antd 为了方便用户内置了一些过滤器，以下是内置过滤器的介绍：

### json

用于将数据转换为 `json` 字符串。

```text
{{ xxx | json(tabSize) }}
```

- tabSize：为缩进数

```jsx
import React from 'react';
import { SuperTpl } from 'super-antd';
const App = () => {
  const data = {
    info: {
      name: 'jack',
      age: 18,
    },
  };
  return (
    <pre>
      <SuperTpl value={'{{data.info | json }}'} data={data}></SuperTpl>
      <SuperTpl value={'{{data.info | json(2) }}'} data={data}></SuperTpl>
    </pre>
  );
};
export default App;
```

### toNumber

字符串转为数字，如果目标数据不是字符串则不处理。

```text
{{xxx | toNumber}}
```

### toInt

字符串或者数字转整数，如果目标数据不是字符串或者数字则不处理。

```text
{{xxx | toInt}}
```

```jsx
import React from 'react';
import { SuperTpl } from 'super-antd';
const App = () => {
  return <SuperTpl value="{{data.price | toInt }}" data={{ price: 10.99 }}></SuperTpl>;
};
export default App;
```

### toFloat

字符串转为浮点数，如果目标数据不是字符串则不处理。

```text
{{xxx | toFloat}}
```

### toPrice

将数字转为千分位。

```text
{{xxx | number}}
```

```jsx
import React from 'react';
import { SuperTpl } from 'super-antd';
const App = () => {
  return <SuperTpl value="{{data.total | toPrice }}" data={{ total: 10209.11 }}></SuperTpl>;
};
export default App;
```

### toPercent

将数字转为百分数。

```text
{{xxx | toPercent(decimals)}}
```

- decimals：指定小数点后 n 位数，默认为 `0`

```jsx
import React from 'react';
import { SuperTpl } from 'super-antd';
const App = () => {
  return (
    <>
      <SuperTpl value="{{data.num | toPercent }}" data={{ num: 0.9854 }}></SuperTpl>
      <SuperTpl value="{{data.num | toPercent(1) }}" data={{ num: 0.9854 }}></SuperTpl>
    </>
  );
};
export default App;
```

### round

四舍五入取整。

```text
{{xxx | round }}
```

```jsx
import React from 'react';
import { SuperTpl } from 'super-antd';
const App = () => {
  return <SuperTpl value="{{data.num | round }}" data={{ num: 1.48 }}></SuperTpl>;
};
export default App;
```

### date

日期格式化过滤器，用于把特定时间值按指定格式输出，其内部使用到了 [dayjs](https://www.npmjs.com/package/dayjs)。

```text
{{xxx | date(format)}}
```

- format：需要展示的格式，默认为 'YYYY-MM-DD'

```jsx
import React from 'react';
import { SuperTpl } from 'super-antd';
const App = () => {
  return <SuperTpl value="{{data.startTime | date }}" data={{ startTime: new Date() }}></SuperTpl>;
};
export default App;
```

### trim

把字符串前后多余的空格去掉，非字符串则不做任何处理。

```text
{{xxx | trim}}
```

```jsx
import React from 'react';
import { SuperTpl } from 'super-antd';
const App = () => {
  return <SuperTpl value="{{data.name | trim}}" data={{ name: '  jack  ' }}></SuperTpl>;
};
export default App;
```

### truncate

当超出若干个字符时，后面的部分直接显示某串字符，非字符串不做处理。

```text
{{xxx | truncate(length, mask)}}
```

- length：指定多长的字符后省略，默认为 `200`；
- mask：省略时显示的字符，默认为 `...`

```jsx
import React from 'react';
import { SuperTpl } from 'super-antd';
const App = () => {
  return (
    <SuperTpl
      value="{{data.article | truncate(10) }}"
      data={{ article: '这是一段很长很长的话很长很长的话很长很长的话' }}
    ></SuperTpl>
  );
};
export default App;
```

### split

可以将字符传通过分隔符分离成数组，非字符串不做处理。

```text
{{xxx | split(delimiter)}}
```

- delimiter：分隔值，默认为 `,`

```jsx
import React from 'react';
import { SuperTpl } from 'super-antd';
const App = () => {
  return <SuperTpl value="{{data.arr | split | json }}" data={{ arr: '1,2,3' }}></SuperTpl>;
};
export default App;
```

### join

当变量值是数组时，可以把内容连接起来，非数组不做处理。

```text
{{xxx | join(glue)}}
```

- glue：连接符，默认为空字符

```jsx
import React from 'react';
import { SuperTpl } from 'super-antd';
const App = () => {
  return <SuperTpl value="{{data.arr | join }}" data={{ arr: [1, 3, 4] }}></SuperTpl>;
};
export default App;
```

### sum

求和，对数组内容求和，非数组不做处理。

```text
{{xxx|sum}}
```

```jsx
import React from 'react';
import { SuperTpl } from 'super-antd';
const App = () => {
  return <SuperTpl value="{{data.numbers | sum }}" data={{ numbers: [1, 4, 3] }}></SuperTpl>;
};
export default App;
```

### abs

变成正数，非数字不做处理。

```text
{{ xxx | abs }}
```

```jsx
import React from 'react';
import { SuperTpl } from 'super-antd';
const App = () => {
  return <SuperTpl value="{{data.num | abs }}" data={{ num: -18 }}></SuperTpl>;
};
export default App;
```

### toLowerCase

将字符串转小写

```text
{{xxx | toLowerCase}}
```

```jsx
import React from 'react';
import { SuperTpl } from 'super-antd';
const App = () => {
  return <SuperTpl value="{{data.name | toLowerCase}}" data={{ name: 'Jack' }}></SuperTpl>;
};
export default App;
```

### toUpperCase

将字符串转大写

```text
{{xxx | toUpperCase}}
```

```jsx
import React from 'react';
import { SuperTpl } from 'super-antd';
const App = () => {
  return <SuperTpl value="{{data.name | toUpperCase }}" data={{ name: 'Jack' }}></SuperTpl>;
};
export default App;
```

### isTrue

真值条件过滤器，仅当为布尔值时起作用，其他情况不起作用。

```text
{{xxx | isTrue(trueValue, falseValue)}}
```

- trueValue: 如果变量为 真，即返回该值；
- falseValue: 如果变量为 假，则返回该值。

```jsx
import React from 'react';
import { SuperTpl } from 'super-antd';
const App = () => {
  return <SuperTpl value="{{data.val | isTrue('启用', '禁用') }}" data={{ val: true }}></SuperTpl>;
};
export default App;
```

### isTruly

真值条件过滤器，和 `isTrue` 不同的是，它会对所有类型的值判断。

```text
{{xxx | isTruly(trueValue, falseValue)}}
```

- trueValue: 如果变量为 真，即返回该值；
- falseValue: 如果变量为 假，则返回该值。

```jsx
import React from 'react';
import { SuperTpl } from 'super-antd';
const App = () => {
  return <SuperTpl value="数据为：{{data.val | isTruly('真的', '假的') }}" data={{ val: '' }}></SuperTpl>;
};
export default App;
```

### isFalse

假值条件过滤器，仅当为布尔值时才做判断。

```text
{{xxx | isFalse(falseValue, trueValue)}}
```

用法与 isTrue 过滤器 相同，判断逻辑相反。

### isFalsely

假值条件过滤器，与 `isFalse` 不同的是，它会对所有类型判断。

```text
{{xxx | isFalse(falseValue, trueValue)}}
```

用法与 isTrue 过滤器 相同，判断逻辑相反。
