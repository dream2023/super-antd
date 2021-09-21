# 百度地图选择器

百度地图选择器是基于 [@uiw/react-baidu-map](https://github.com/uiwjs/react-baidu-map/) 实现，用于选择地理位置，包括以下特性：

- 支持手动选择坐标
- 支持模糊搜索

## 基本使用

<code src="./__demos__/baidu-map/base.tsx" />

## 全局配置秘钥

配置菜单我们推荐其和 `withDefaultProps` 一起使用，这样就可以一次配置，全项目共用，具体参考下面的例子。

<code src="./__demos__/baidu-map/ak.tsx" />

## 只读

<code src="./__demos__/baidu-map/readonly.tsx" />

<API src="./__demos__/baidu-map/types.tsx"></API>
