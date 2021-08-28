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

# 视频上传组件

专门用来上传视频的组件，其基于 ant design 的 [upload 组件](https://ant.design/components/upload-cn/)。

## 基本使用

<code src="./__demos__/video-uploader/base.tsx">

## formatter 响应结果

`SuperVideoUploader` 必须通过 `formatter` 函数 获取视频链接，从而回显。

一般公司内的上传组件都是通用的，所以我们建议其和 `withDefaultProps` 一起使用，例如：

```jsx | pure
export const MyVideoUploader = withDefaultProps(SuperVideoUploader, {
  action: 'https://www.fastmock.site/mock/3bff4788a9dad8a803681a2bca5f9cae/api/upload/video',
  formatter: (response) => response.data.url,
});
```

<code src="./__demos__/video-uploader/formatter.tsx">

## 限制视频类型

可以配置 `accept` 来限制可选择的文件类型，格式是文件后缀名 `.xxx`，想要限制多个类型，则用逗号分隔，例如：`.mp4,.flv`

<code src="./__demos__/video-uploader/accept.tsx">

## 限制视频大小

可以配置 `maxSize` 来限制大小，单位为 `mb`。

<code src="./__demos__/video-uploader/maxSize.tsx">

## 只读

<code src="./__demos__/video-uploader/readonly.tsx">

## 上传到云服务

参考 [图片上传到云服务](/components/form/image-uploader#上传到云服务)

<API src="./__demos__/video-uploader/types.tsx"></API>
