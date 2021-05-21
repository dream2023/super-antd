export default {
  cjs: { type: 'babel', lazy: true },
  esm: { type: 'babel', importLibToEs: true },
  runtimeHelpers: true,
  lessInBabelMode: {},
  extraBabelPlugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src',
        },
      },
    ],
    ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
    [require('./scripts/replaceLib')],
  ],
};
