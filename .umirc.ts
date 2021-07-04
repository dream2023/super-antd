import { defineConfig } from 'dumi';
export default defineConfig({
  title: 'super-antd',
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  fastRefresh: {},
  dynamicImport: {},
  base: '/super-antd',
  publicPath: '/super-antd/',
  exportStatic: {},
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  navs: [
    {
      title: '生态',
      children: [
        {
          title: 'react-schema-render 动态渲染',
          path: 'https://gitee.com/dream2023/react-schema-render',
        },
        {
          title: '@dream2023/data-mapping 数据映射',
          path: 'https://gitee.com/dream2023/data-mapping',
        },
        {
          title: 'antd-image-cropper 图片裁剪组件',
          path: 'https://github.com/dream2023/antd-image-cropper',
        },
      ],
    },
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/dream2023/super-antd',
    },
  ],
});
