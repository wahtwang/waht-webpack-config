const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require('path')
const rootProject = process.cwd()
const configList = [baseConfig('development', rootProject)]

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
configList.push(devConfig)
try {
  const { dev = {}, all = {} } = require(path.join(rootProject, '/waht-config'))
  configList.push(all, dev)
} finally {
  module.exports = merge(...configList)
}
