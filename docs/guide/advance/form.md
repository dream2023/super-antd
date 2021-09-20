---
order: 20
group:
  path: /advance
  title: 高级
  order: 3
nav:
  title: 指南
  path: /guide
---

# 扩展表单控件

因为 `super-antd` 是基于 `pro-components` 扩展的，而 `pro-components` 是基于 `ant design` 封装的，所以扩展表单控件，共需要三步：

- 1、普通 react 组件转为 `ant design` 表单控件；
- 2、ant design 表单控件转为 `pro-components` 控件；
- 3、pro-components 控件转为 `super-antd` 控件。

我们通过封装一个富文本表单组件为例，来说明其具体过程。

## 实现步骤

### 1、普通 React 组件转为 `ant design` 表单控件

首先经过挑选，我们选择了 [react-quill](https://github.com/zenoamaro/react-quill) 作为此次封装的组件。

```bash
yarn add react-quill@beta xss
```

然后参考 ant design [自定义表单控件](https://ant.design/components/form-cn/#components-form-demo-customized-form-controls) 教程，明白了 ant design 表单控件和普通组件的区别在于它会被注入两个属性，分别为 `value` 和 `onChange`，我们只需要将这两个属性对应的绑定的自己的组件上即可：

```tsx | pure
// AntdQuill.tsx

import 'react-quill/dist/quill.snow.css';
import React from 'react';
import type { FC } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
/ 导出属性，供外部使用
export type AntdQuillProps = ReactQuillProps;
const AntdQuill: FC<AntdQuillProps> = ({ value, onChange, ...props }) => {
  / value 和 onChange 被注入，因为 ReactQuill 正好也是叫 value 和 onChange
  / 所以可以直接使用 props，我这里为了演示，就把他解构出来了
  / 如果需要加自己的逻辑或者属性，也可以在此组件处理
  return <ReactQuill theme="snow" value={value} onChange={onChange} {...props} />;
};
export default AntdQuill;
```

### 2、`ant design` 表单控件转为 `pro-components` 控件

我们参考 `pro-components` 的原子组件 [说明文档](https://procomponents.ant.design/components/field#%E5%8F%82%E6%95%B0)，并结合 [源码](https://github.com/ant-design/pro-components/blob/master/packages/form/src/components/TextArea/index.tsx)，可以得出如下的代码：

```tsx | pure
// ProFormQuill.tsx

import ProField from '@ant-design/pro-field';
import type { ProFormItemProps } from '@ant-design/pro-form';
import createField from '@ant-design/pro-form/es/BaseForm/createField';
import React from 'react';
import xss from 'xss';
import AntdQuill, { AntdQuillProps } from './AntdQuill';
/ 导出类型，供外部使用
/ 这里需要使用 ProFormItemProps 包裹一下，让其拥有 Form.Item 的属性
export type ProFormQuillProps = ProFormItemProps<AntdQuillProps>;
const ProFormQuill = ({ fieldProps, proFieldProps }: ProFormQuillProps) => (
  <ProField
    mode="edit"
    valueType="text"
    fieldProps={fieldProps}
    / 只读模式下，我们需要渲染 html
    render={(text) => {
      return <div style={{ marginTop: 5 }} dangerouslySetInnerHTML={{ __html: xss(text) }}></div>;
    }}
    / 编辑模式下，我们渲染 AntdQuill 组件
    / 因为 placeholder 的类型定义和 AntdQuill 有所冲突，所以我们在这里做了一些处理
    renderFormItem={(text, props) => {
      const { placeholder, ...otherProps } = props;
      return (
        <AntdQuill
          value={text}
          placeholder={Array.isArray(placeholder) ? placeholder.join(',') : placeholder}
          {...otherProps}
        />
      );
    }}
    {...proFieldProps}
  />
);
/ 最后需要用 createField 包裹一下
export default createField<ProFormQuillProps>(ProFormQuill);
```

### 3、`pro-components` 控件转为 `super-antd` 控件

最后需要转为 `super-antd` 的空间，做法和 `pro-components` 类似，也是提供了一个高级函数 `createSuperFormItem`，我们只需要将组件传递进去即可：

```tsx | pure
// index.ts
import type { FC } from 'react';
import { createSuperFormItem } from 'super-antd';
import type { CreateSuperFormItemProps } from 'super-antd';
import ProFormQuill from './ProFormQuill';
import type { ProFormQuillProps } from './ProFormQuill';
  类型定义
e
export type SuperQuillProps = CreateSuperFormItemProps<ProFormQuillProps>;
  组件使用 createSuperFormItem 包裹一下
e
export const SuperQuill: FC<SuperQuillProps> = createSuperFormItem(ProFormQuill);
export default SuperQuill;
```

## 效果演示

### 基础功能

<code src="./__demos__/form/base.tsx" />

### 只读

<code src="./__demos__/form/readonly.tsx" />

### 自定义属性

<code src="./__demos__/form/custom.tsx" />

### super-antd 的能力

<code src="./__demos__/form/super.tsx" />

## createSuperFormItem 说明

```ts | pure
import { createSuperFormItem } from 'super-antd'
import type { CreateSuperFormItemProps } from 'super-antd'

export type SuperComponentProps = CreateSuperFormItemProps<ProComponentProps>
const SuperComponent: FC<SuperComponentProps> = createSuperFormItem(ProComponent, {
  /**
   * 如果有 placeholder 属性时，前缀
   *
   * @default '请输入'
   */
  placeholderPrefix?: string;
  /** 是否需要增强数据 增强的数据包括 data、form */
  needData?: boolean;
})

export default SuperComponent
```

一些组件是有 options 属性的，例如 `Select`、`CheckboxGroup` 等，我们这里提供了新的方法做处理：

```ts | pure
import { createSuperFormItemWithOptions } from 'super-antd'
import type { CreateSuperFormItemWithOptionsProps } from 'super-antd'

export type SuperComponentProps = createSuperFormItemWithOptions<ProComponentProps>
const SuperComponent: FC<SuperComponentProps> = CreateSuperFormItemWithOptionsProps(ProComponent, {
  /**
   * 如果有 placeholder 属性时，前缀
   *
   * @default '请输入'
   */
  placeholderPrefix?: string;
  /** 是否需要增强数据 增强的数据包括 data、form */
  needData?: boolean;
  // 传入的组件是否有 loading 属性
  hasLoadingProp?: boolean;
})

export default SuperComponent
```
