---
order: 2
group:
  path: /form
  title: 表单
nav:
  title: 组件
  path: /components
  order: 5
---

# 表单项组件集合

表单项组件的属性是由 [表单项通用属性](/form/form-item) + 组件自身属性构成，例如 `SuperInput` 的属性就是由 [表单项通用属性](/form/form-item) + [Input](https://ant.design/components/input-cn/) 组件属性组成。

## 组件展示

<code src="./__demos__/form-components/all.tsx" />

## 增强组件示例

有一些组件除了 ant design 组件的属性，还附加了其他的增强属性，这里就一一列举说明一下。

> 为了减少大家多个文档翻阅的麻烦，我将部分 pro-components 组件说明搬到了这里。

### options 增强

ant design 中 `Select`、`Checkbox` 逐渐等支持 `options` 属性作为列表项，但仅支持 **对象数据** 的形式，`super-antd` 在此技术上增加了 `普通数据`、`API 请求`、`Promise` 等，具体请看 [options 列表](/components/form/options) 说明。

涉及的组件有：

- SuperSelect
- SuperSearchSelect
- SuperCheckboxGroup
- SuperRadioGroup
- SuperRadioButton

### SuperSearchSelect

SuperSearchSelect 除了支持 options 获取列表，还支持 `request` 属性，通过关键词，搜索远程列表。

其工作原理其实和 options 属性一致，就是向请求参数中注入了 `keyWords` 作为参数而已，当然你可以通过参数映射的方式改变请求参数的名字。

<code src="./__demos__/form-components/search-select.tsx" />

| 参数    | 说明             | 类型      | 默认值 |
| ------- | ---------------- | --------- | ------ |
| request | 搜索请求远程列表 | `ApiType` | -      |

### SuperColor

ant-design 中并没有颜色选择器，SuperColor 就是一个能满足需求的颜色选择器。

```jsx | pure
<SuperColor name="bg-color" label="背景颜色" />
```

### SuperCaptcha

SuperCaptcha 既原 [ProFormCaptcha](https://procomponents.ant.design/components/field-set/#proformcaptcha) 是为了支持中后台中常见的验证码功能开发的组件。

```jsx | pure
<ProFormCaptcha
  fieldProps={{
    size: 'large',
    prefix: <MailTwoTone />,
  }}
  captchaProps={{
    size: 'large',
  }}
  // 手机号的 name，onGetCaptcha 会注入这个值
  phoneName="phone"
  name="captcha"
  rules={[
    {
      required: true,
      message: '请输入验证码',
    },
  ]}
  placeholder="请输入验证码"
  // 如果需要失败可以 throw 一个错误出来，onGetCaptcha 会自动停止
  // throw new Error("获取验证码错误")
  onGetCaptcha={async (phone) => {
    await waitTime(1000);
    message.success(`手机号 ${phone} 验证码发送成功!`);
  }}
/>
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onGetCaptcha | 点击获取验证码的事件，如果配置了 phoneName 会自动注入 | `(phone)=>Promise<any>` | - |
| captchaProps | 获取验证码按钮的 props，与 antd 的 props 相同 | `ButtonProps` | - |
| countDown | 倒计时的秒数 | number | 60 |
| captchaTextRender | 渲染计时的文案 | `(timing: boolean, count: number) => React.ReactNode` | - |

### SuperCheckbox

SuperCheckbox 除了 options 增强外，还继承了 [ProFormCheckbox](https://procomponents.ant.design/components/field-set/#proformcheckbox) 的 `layout` 属性。

| 参数   | 说明                                                     | 类型                       | 默认值 |
| ------ | -------------------------------------------------------- | -------------------------- | ------ |
| layout | 配置 checkbox 的样子，支持垂直`vertical` 和 `horizontal` | `horizontal` \| `vertical` | -      |

### SuperUploadDragger

SuperUploadDragger 既 [ProSuperUploadDragger](https://procomponents.ant.design/components/field-set/#proformuploaddragger)。既预设了 Dragger 的样式，其他与 Upload 相同。

| 参数        | 说明             | 类型        | 默认值                           |
| ----------- | ---------------- | ----------- | -------------------------------- |
| icon        | Dragger 的图表。 | `ReactNode` | InboxOutlined                    |
| title       | Dragger 的标题   | `ReactNode` | '单击或拖动文件到此区域进行上传' |
| description | Dragger 的描述   | `ReactNode` | '支持单次或批量上传'             |

```tsx | pure
<SuperUploadDragger label="Dragger" name="dragger" action="upload.do" />
```

### SuperUploadButton

SuperUploadButton 既 [ProUploadButton](https://procomponents.ant.design/components/field-set/#proformuploadbutton)。它预设了 Button 的样式，其他与 Upload 相同。

| 参数  | 说明             | 类型        | 默认值         |
| ----- | ---------------- | ----------- | -------------- |
| icon  | Dragger 的图表。 | `ReactNode` | UploadOutlined |
| title | Dragger 的标题   | `ReactNode` | 单击上传       |

```tsx | pure
<SuperUploadButton label="upload" name="upload" action="upload.do" />
```

## 属性对应列表

以下是 super-antd 组件与 antd 组件对应关系：

| super-antd 组件 | ant design / pro-components 组件 | 含义 |
| --- | --- | --- |
| SuperInput | [Input](https://ant.design/components/input-cn/)​ | 输入框 |
| SuperPassword | [Input](https://ant.design/components/input-cn/#components-input-demo-password-input) | 密码输入框 |
| SuperUrl | [Input](https://ant.design/components/input-cn/) | URL 输入框 |
| SuperEmail | [Input](https://ant.design/components/input-cn/) | 邮箱输入框 |
| SuperNumber | [InputNumber](https://ant.design/components/input-number-cn/) | 数字输入框 |
| SuperTextArea | [Input.TextArea](https://ant.design/components/input-cn/#Input.TextArea) | 文本域输入框 |
| SuperCaptcha | [ProFormCaptcha](https://procomponents.ant.design/components/field-set#proformcaptcha) | 验证码 |
| SuperRadioGroup | [Radio](https://ant.design/components/radio-cn/) | 单选组 |
| SuperRadioButton | [Radio](https://ant.design/components/radio-cn/#components-radio-demo-radiobutton-solid) | 单选按钮样式组 |
| SuperCheckbox | [Checkbox](https://ant.design/components/checkbox-cn/) | 复选框 |
| SuperCheckboxGroup | [Checkbox](https://ant.design/components/checkbox-cn/#components-checkbox-demo-group) | 复选框组 |
| SuperSwitch | [Switch](https://ant.design/components/switch-cn/) | 开关 |
| SuperSelect | [Select](https://ant.design/components/select-cn/) | 选择 |
| SuperSearchSelect | [Select](https://ant.design/components/select-cn/) | 远程搜索 |
| SuperTime | [DatePicker](https://ant.design/components/time-picker-cn/) | 时间 |
| SuperDate | [DatePicker](https://ant.design/components/time-picker-cn/) | 日期 |
| SuperWeek | [DatePicker](https://ant.design/components/date-picker-cn/#DatePicker[picker=week]) | 周 |
| SuperMonth | [DatePicker](https://ant.design/components/date-picker-cn/#DatePicker[picker=month]) | 月 |
| SuperQuarter | [DatePicker](https://ant.design/components/date-picker-cn/#DatePicker[picker=quarter]) | 季 |
| SuperYear | [DatePicker](https://ant.design/components/date-picker-cn/#DatePicker[picker=year]) | 年 |
| SuperDateTime | [DatePicker](https://ant.design/components/date-picker-cn/) | 日期时间 |
| SuperDateRange | [DatePicker.RangePicker](https://ant.design/components/date-picker-cn/#RangePicker) | 日期范围 |
| SuperTimeRange | [DatePicker.RangePicker](https://ant.design/components/date-picker-cn/#RangePicker) | 时间范围 |
| SuperDateTimeRange | [DatePicker.RangePicker](https://ant.design/components/date-picker-cn/#RangePicker) | 日期时间范围 |
| SuperUploadButton | [ProFormUploadButton](https://procomponents.ant.design/components/field-set#proformuploadbutton) | 上传按钮 |
| SuperUploadDragger | [ProFormUploadDragger](https://procomponents.ant.design/components/field-set#proformuploaddragger) | 拖拽上传 |
| SuperRate | [rate](https://ant.design/components/rate-cn/) | 评分 |
| SuperColor |  | 颜色 |
| SuperSlider | [slider](https://ant.design/components/slider-cn/) | 滑块 |
