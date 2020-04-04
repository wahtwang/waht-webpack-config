const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const webpack = require('webpack')
const devConfig = {
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: './build',
    hot: true,
    watchContentBase: true,
    disableHostCheck: true
  },
  devtool: 'cheap-source-map'
}
module.exports = merge(baseConfig('development'), devConfig)
