const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require('path')
const rootProject = process.cwd()
const { dev = {}, all = {} } = require(path.join(rootProject, '/waht-config'))
const devConfig = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    disableHostCheck: true,
    host: '0.0.0.0'
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 500
  },
  devtool: 'cheap-source-map'
}
module.exports = merge(baseConfig('development', rootProject), devConfig, all, dev)
