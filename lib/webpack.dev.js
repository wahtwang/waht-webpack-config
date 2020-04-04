const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const webpack = require('webpack')
const devConfig = {
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: './build',
    hot: true,
    watchContentBase: true,
    disableHostCheck: true,
    host: '0.0.0.0'
  },
  devtool: 'cheap-source-map'
}
module.exports = merge(baseConfig('development'), devConfig)
