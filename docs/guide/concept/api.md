---
order: 17
group:
  path: /concept
  title: 核心概念
  order: 2
nav:
  title: 指南
  path: /guide
---

# API 请求

## 配置 axios

由于每个公司的接口规范不尽相同，所以 super-antd 并没有内置 axios，而是采用配置的方式，用户可以根据公司情况定制 axios，例如公司采用如下的接口约定：

```js
{
  code: 0, // code 为 0 表示无错误，其他值则为相应的错误码
  message: "ok", // message 为返回的信息
  data: { // data 为请求返回数据
    //..
  }
}
```

那我们就可以创建 axios 实例为：

```js | pure
// ./axios-instance.js

// 引入 axios
import axios from 'axios';

// 创建新的 axios 实例
const instance = axios.create({});

// 创建相应拦截器
instance.interceptors.response.use(
  function ({ status, data: { code, message, data } }) {
    // 如果响应结果是 200 且 code 为 0 ，则代表请求成功
    if (status === 200 && code === 0) {
      // 直接返回请求数据，取出响应结果里的 data 数据
      return data;
    }

    // 否则是请求失败
    // 请求失败有两种返回结果
    // 第一种返回结果是 string 类型，代表错误信息
    return Promise.reject(msg);

    // 表单错误回显
    // 第二种返回结果是 object 类型，代表其中 message 代表错误信息，errors 代表错误的详细解释
    // 这种情况主要是应对表单服务器校检回显
    return Promise.reject({
      message,
      errors: data,
    });
  },
  function (error) {
    // 一般是跨域或者网络错误
    // 我们可以直接返回 error，内部会自动获取 error.message 属性
    return Promise.reject(error);
  },
);

// 导出
export default instance;
```

当然上面的处理方式只是最简单的，对于有些业务逻辑，例如 `301`、`304` 等需要退出登录或者跳转页面或者上报日志，可以继续加 `if/else`，只需要记住最终的返回结果是： `

- **成功**：返回相应的 `data`；
- **失败**：返回 `string 或者 Error` 类型的错误原因，或者 `{message: string, errors: object}` 的错误对象。

然后通过 `SuperProvider` 提供给子孙组件使用这个 axios 实例：

```jsx | pure
import { SuperProvider } from 'super-antd';
import axiosInstance from './axios-instance';
<SuperProvider axios={axiosInstance}>{/** 其他组件 */}</SuperProvider>;
```

## 请求地址

### api 为字符串

我们以 `SuperForm` 中的 `initApi` 属性为例：

```jsx | pure
<SuperForm initApi="/user/1"></SuperForm>
```

<code src="./__demos__/api/string.tsx" />

### api 为对象

如果 api 为对象类型，则其配置内容同 [axios 请求对象](https://gitee.com/mirrors/axios?utm_source=alading&utm_campaign=repo#request-config)，例如：

```jsx | pure
<SuperForm
  initApi={{
    url: '/user/1',
    method: 'GET',
    params: {
      foo: 'bar',
    },
  }}
></SuperForm>
```

<code src="./__demos__/api/object.tsx" />

### api 为异步函数

很多情况下，我们将请求统一放到一个目录下，先书写好，然后导出供外部使用，例如：

```ts | pure
// 获取用户
export const getUser = (id: number) => {
  return axios({ method: 'GET', url: `/user/${id}` });
};

// 更新文章
export const updateArticle = (id: number) => {
  // ...
};
```

```jsx | pure
import { getUser } from 'path/to/api';

<SuperForm initApi={() => getUser(1)}></SuperForm>;
```

这种方式也是支持的，具体看下面例子：

<code src="./__demos__/api/promise.tsx" />

或者是更为简单的，直接写一个异步函数，都是可以的。

```jsx | pure
<SuperForm
  initApi={async () => {
    // 发起请求
    const data = await axiosInstance.get('/options/a');
    // 数据转换
    return data.list.map((item) => ({ label: item.name, value: item.id }));
  }}
></SuperForm>
```

<code src="./__demos__/api/fn.tsx" />

## 表单错误回显

对于错误回显，在开篇已经介绍过了，就是最后的 `Promise.reject()` 必须为 `{ message: string; errors: object }` 的对象。

<code src="./__demos__/api/form_error.tsx" />

## 映射

### url 映射

api 为 string 类型或者对象时的 url 属性支持参数映射，例如：`/city?province={{data.province}}` 就会将 `{{data.province}}` 替换成真正的数据，例如：

<code src="./__demos__/api/url_template.tsx" />

### 参数映射

`api.data` 和 `api.params` 支持参数映射，两者的不同是，`api.data` 是会放到 `body` 中，而 `api.params` 则会放到 `query` 中，我们以 `SuperForm` 的保存接口为例：

<code src="./__demos__/api/request.tsx" />

### 响应映射

`api.response` 可以对响应结果进行映射：

<code src="./__demos__/api/response.tsx" />

### 映射函数

`api.data`、`api.params`、`api.response` 不仅支持字符串模板的形式，还支持函数形式，还是上面的例子，例如：

<code src="./__demos__/api/map_fn.tsx" />

### replaceData

返回的数据是否替换掉当前的数据，默认为 `false`（即追加），设置为 `true` 就是完全替换当前数据。

## message 提示信息

### 自定义提示信息

我们可以通过 `message.xxx` 自定义提示信息，例如在表单中，我们可以通过 `message.saveError` 自定义错误提示信息：

<code src="./__demos__/api/notice_custom.tsx" />

### 自定义提示方式

<code src="./__demos__/api/notice_type.tsx" />
