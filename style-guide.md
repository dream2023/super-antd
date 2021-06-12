# 代码风格

写给自己看的代码风格规范，让写代码变得更加有章法。

## 目录采用小写和中划线风格

例如: 将文件目录命名为 `form-item` 而不是 `FormItem`。

## 每个组件都要有一个 `index.ts` 入口文件，入口文件导出本组件的所有内容

例如 `form-item` 组件中，入口文件内容如下：

```js
export * from './src/hoc';
export * from './src/utils';
export * from './src/components';
export * from './src/createSuperFormItem';
```

入口文件导出最好按照长度排序，好看。

## React 组件文件采用大驼峰属性方式

例如 `Color.tsx` 组件。

## 组件文件不需要带 `Super` 一词

例如应该是 `Checkbox.tsx` 而不是 `SuperCheckbox.tsx` 。

## 组件需要带上 `Super` 一词

例如 `Checkbox.tsx` 对应着 `SuperCheckbox` 组件。

## 非 React 组件文件使用小驼峰

例如 `util.ts` 或者 `useAxios.ts`

## React 组件类型定义应为 `组件名Props`

例如 `SuperCheckbox` 组件，其组件属性定义应该为 `SuperCheckboxProps`。

## 导出函数: 最多 2 个参数，其余的放入一个选项对象（options object）

在设计函数接口时，请严格遵循以下规则：

- 1、若某函数是公共 API 的一部分，则其可以接受 0~2 个参数，如果必要的话，可以外加一个选项对象，因此最大总数为 3 个。
- 2、可选参数通常应放到选项对象中。如果只有一个可选参数，并且将来一般不会添加更多可选参数，那么该可选参数可以不放在选项对象中。

```ts
// 错误示例：可选参数不是选项对象的一部分 (#2)
export function resolve(hostname: string, family?: 'ipv4' | 'ipv6', timeout?: number): IPAddress[] {}

// 正确示例：
export interface ResolveOptions {
  family?: 'ipv4' | 'ipv6';
  timeout?: number;
}
export function resolve(hostname: string, options: ResolveOptions = {}): IPAddress[] {}
```

```ts
// 错误示例：多于3个参数 (#1)，多个可选参数 (#2)。
export function renameSync(oldName: string, newName: string, replaceExisting?: boolean, followLinks?: boolean) {}

// 正确示例
interface RenameOptions {
  replaceExisting?: boolean;
  followLinks?: boolean;
}
export function renameSync(oldName: string, newName: string, options: RenameOptions = {}) {}
```

```ts
// 错误示例：参数过多 (#1)
export function write(fd: number, buffer: TypedArray, offset: number, length: number, position: number) {}

// 正确示例：
export interface PWrite {
  fd: number;
  buffer: TypedArray;
  offset: number;
  length: number;
  position: number;
}
export function write(options: PWrite) {}
```

## 不同组件之间使用别名引入

```js
// form 组件引入 btns 组件 ✅
import { Btns } from '@/btns';





// 不应该从 'supe
import { Btns } from 'super-antd';
';
;




/
import { Btns } from '../btns';
```

## 合理使用 JsDoc

如果可能的话，最好写单行 JSDoc。例如:

```js
/** 这样写单行 JSDoc 注释。 */
export function foo() {
  // ...
}
```

不要写为：

```js
/** 不要这样写单行 JSDoc 注释。 */
```

代码字符串文字应使用反引号（`）括起来，而不是用引号。例如：

```js
/** Import something from the `super-antd`. */
```

不要使用 `@param`，因为 TypeScript 已经是强类型化的了。

```ts
/**
 * Function with non obvious param.
 *
 * @param foo Description of non obvious parameter.
 */
```

代码示例要和说明之间空一行，并且示例代码的每一行需要有 6 个额外空格。比注释的第一列多 4 个空格。例如：

```js
/**
 * A straight forward comment and an example:
 *
 *     import { useAxios } from 'super-antd';
 *     const { loading } = useAxios({ api });
 */
```

既然代码示例已经是一个注释了，它就不应再包含其他注释。如果它需要进一步的注释，那意味着它不是一个很好的示例

## 测试用例和文件一一对应

每个文件都应该有一个测试用例，测试用例文件和测试文件名一一对应。

```bash
src
  btns
    Btns.tsx

# 对应着测试用例应该为
tests
  btns
    Btns.test.tsx
```

## 文档示例应独立文件

`dumi` 提供了 `code` 标签去引入组件示例的能力，所以我们不应该在 markdown 内部再去写示例。

每一篇文档都需要对应一个文件夹，例如：

```bash
form.md
select.md

# 他们的 demo 文件对应着同级目录下的

__demos__
  form
    hideLabel.tsx
    api_basic.tsx
```

每个文件名都能够表达其基本含义，例如上面 form 组件的 `hideLabel` 表示 `hideLabel` 属性对应的功能示例，而 `api_basic` 表示 `api` 属性的基本使用方式。

而不应是：

```bash
❌
__demos__
  form
    demo1.tsx
    demo2.tsx
```

## Typescript 类型有三种模式 `XxxProps`、`XxxxType`、`XxxOptions`

- `XxxProps` 专用于 React 组件属性
- `XxxOptions` 专用于函数参数
- `XxxxType` 非上述两种情况

```tsx
interface SuperFormProps {
  // ...
}

const SuperForm: FC<SuperFormProps> = () => {};
```

```tsx
interface GetBtnsOptions {}
function getBtns(options: GetBtnsOptions) {}
```

```tsx
export type AlignType = 'left' | 'right' | 'center'; // 其他情况使用 XxxType

interface SuperBtnsProps {
  align: AlignType;
}
```

需要注意的是，一个组件的属性可能有多部分组成，则其他部分也是用 `XxxProps` 定义。

```tsx
interface SuperFormItemInjectProps {}
interface SuperFormItemOverwriteProps {}
interface SuperFormItemProps extends SuperFormItemInjectProps, SuperFormItemOverwriteProps {}
```

## 使用 `useCreation` 而不是 `useMemo`

具体可以看 [useCreation](https://ahooks.gitee.io/zh-CN/hooks/advanced/use-creation) 介绍。

## 每个组件都要导出自己的 Props，别人有可能在你的组件基础上封装

## 如果一个组件内容不能由一个文件单独承载，则需要创建 src 目录

例如 `provider` 组件：

```bash
provider
  index.ts # 用于导出所有
  src
    Provider.tsx # 必须有一个同名的
    context.ts
```

## 对于 `export default` 默认导出的内容，也需要 `export` 出去

```js
export const foo = 123; // 就算是 export default 也需要 export
export default foo;
```

## 每个组件的每个 prop 都要有注释
