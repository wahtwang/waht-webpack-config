const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const webpack = require('webpack')
const devConig = {
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: './build',
    hot: true,
    devTool: 'cheap-source-map'
  }
}
module.exports = merge(baseConfig('development'), devConig)
