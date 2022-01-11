const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  mode: 'development',
  name: 'dev-config',
  target: ['web', 'es5'],
  entry: {
    main: path.resolve(__dirname, './src/js/controller.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './dist')
    },
    port: 8080,
    open: true,
    compress: true,
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      linkType: 'text/css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.s?css$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [postcssPresetEnv({ browsers: 'last 2 versions' })]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  }
};
