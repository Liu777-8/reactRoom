const webpack = require('webpack');
const { merge } = require('webpack-merge');
// const path = require('path');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  // 开发环境本地启动的服务配置
  devServer: {
    port: 9001,
    hot: true,
    open: true,
    historyApiFallback: true,
    compress: true,
    client: {
      overlay: false, // 禁用全屏错误提示
    },
    // 接口代理转发
    proxy: {
      '/testapi': {
        target: 'https://www.easy-mock.com/mock/5dff0acd5b188e66c6e07329/react-template',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/testapi': '' },
      },
      '/app': {
        target: 'https://192.168.2.35/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: 'eval-source-map',
  // optimization: {
  //   moduleIds: 'named',
  // },
});
