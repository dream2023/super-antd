const path = require('path');

module.exports = {
  output: {
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  mode: 'production',
  resolve: {
    extensions: ['.json', '.js'],
  },
  entry: './es/index.js',
  externals: [
    {
      react: 'React',
      antd: 'antd',
    },
  ],
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    filename: 'super-antd.js',
    library: 'superAntd',
    path: path.resolve(__dirname, './dist'),
  },
};
