const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
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
module.exports = merge(baseConfig('development'), devConfig)
