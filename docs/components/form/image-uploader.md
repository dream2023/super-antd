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

# 图片上传组件

专门用来上传图片的组件，其基于 ant design 的 [upload 组件](https://ant.design/components/upload-cn/)。

## 基本使用

<code src="./__demos__/image-uploader/base.tsx">

## formatter 响应结果

`SuperImageUploader` 必须通过 `formatter` 函数图片链接，从而回显。

一般公司内的上传组件都是通用的，所以我们建议其和 `withDefaultProps` 一起使用，例如：

```jsx | pure
export const MyImageUploader = withDefaultProps(SuperImageUploader, {
  action: 'https://www.fastmock.site/mock/32d872e565fbab87ba76057c18f7f8e0/api/upload',
  formatter: (response) => response.url,
});
```

<code src="./__demos__/image-uploader/formatter.tsx">

## 限制图片类型

可以配置 `accept` 来限制可选择的文件类型，格式是文件后缀名 `.xxx`，想要限制多个类型，则用逗号分隔，例如：`.jpg,.jpeg,.png`

<code src="./__demos__/image-uploader/accept.tsx">

## 限制图片大小

可以配置 `maxSize` 来限制大小，单位为 `kb`。

<code src="./__demos__/image-uploader/maxSize.tsx">

## 上传数量

默认上传数量是 `1` 个，可以配置 `maxCount` 来调整数量，如果想不限数量可以配置 `multiple` 为 `true`。

<code src="./__demos__/image-uploader/maxCount.tsx">

## 限制图片尺寸

我们可以通过 `limit` 属性来限定图片的比例、宽度、高度、最小宽度、最大宽度、最小高度、最大高度。

<code src="./__demos__/image-uploader/limit.tsx">

## 预览图尺寸

预览图也可以设置大小和比例，默认情况下如果设置了图片的比例，预览图也会继承此比例，如果都没设置，宽高默认为 `120px`。

<code src="./__demos__/image-uploader/previewLimit.tsx">

## 支持裁剪

我们可以通过 `crop` 设置为 `true` 开启裁剪，并通过 `limit` 属性做宽高、比例等限定。其内部使用到了 [antd-image-cropper](https://github.com/dream2023/antd-image-cropper)。

<code src="./__demos__/image-uploader/crop.tsx">

## 数据回显

如果图片是对象数组类型或者对象类型，我们可以指定 `uidKey`、`urlKey` 来省掉一次遍历。

<code src="./__demos__/image-uploader/back.tsx">

## 只读

<code src="./__demos__/image-uploader/readonly.tsx">

## 上传到云服务

为了简化上传到云服务的操作，我们提供了 `dataApi` 属性用于从服务器获取上传所需参数，目前各大云厂商均支持这种形式。

**阿里云**：

如果你使用的是阿里云，可以先看一下[upload 官方示例](https://ant.design/components/upload-cn/#components-upload-demo-upload-with-aliyun-oss)、[OSS 官方文档](https://help.aliyun.com/document_detail/31923.html?spm=a2c4g.11174283.6.1739.4c3c4c07IqAaeL)和上传所需参数的[具体含义](https://help.aliyun.com/document_detail/31988.htm?spm=a2c4g.11186623.2.7.7ee443e6EhImWV#reference-smp-nsw-wdb)，也就是 `dataApi` 接口必须返回以下字段：

```js | pure
{
  key: "img/2028/08/08/ahQNpDM3iy1625386570091-1625386570091.jpeg", // 文件路径，必须
  policy: "eyJleHBpcmF0aW9uIjoiMjAyMS0wNy0wNFQxNjoxODowOCoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJiaWctYyJ9LFsiY29udGVudC1sZM5ndGgtcmFuZ2UiLDAsNTI0Mjg4MF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJjbXMvaW1nLzIwMjEvMDcvMDQvIl1dfQ==", // 验证表单字段的合法性
  OSSAccessKeyId: "62vs8qNHuFvbNF6Y", // Bucket拥有者的AccessKey ID
  Signature: "V5jM34ebiMwjCZLw0uM2/ABGpD0=", // 签名
}
```

**七牛云**：

七牛云所需要的参数更少也更简单，其核心只需要两个参数，具体说明[参见官网](https://developer.qiniu.com/kodo/1272/form-upload)，以下为示例：

```js | pure
{
  key: 'img/test.jpg', // 上传文件 id
  token: 'TpoFSEsMYnlwuMMSd8WiWmLyPWIOBhHFdvwOSmYu:f3yrM-LqBKWCxYl6BoTpSA0T4Mo=:eyJzY29wZSI6Im1vbmFjby1lZGl0b3IiLCJkZWFkbGluZSI6MTYyNTQwOTc3OX0=' // 上传 token

}
```

其他云也是类似，这里就不一一举例了，具体可以看各自的文档，我们以阿里云为例：

<code src="./__demos__/image-uploader/dataApi.tsx">

<API src="./__demos__/image-uploader/types.tsx"></API>

### Limit

| Name        | Description                                                      | Type   | Default |
| ----------- | ---------------------------------------------------------------- | ------ | ------- |
| aspectRatio | 图片宽高比，例如宽高比为 16:9，那么 aspectRatio 为 16 / 9 即可。 | number | `--`    |
| width       | 图片宽度                                                         | number | `--`    |
| height      | 图片高度                                                         | number | `--`    |
| minWidth    | 图片最小宽度                                                     | number | `--`    |
| minHeight   | 图片最小高度                                                     | number | `--`    |
| maxWidth    | 最大宽度                                                         | number | `--`    |
| maxHeight   | 最大高度                                                         | number | `--`    |

### PreviewLimit

| Name        | Description | Type   | Default |
| ----------- | ----------- | ------ | ------- |
| aspectRatio | 宽高比      | number | `--`    |
| width       | 宽度        | number | `--`    |
| height      | 高度        | number | `--`    |
