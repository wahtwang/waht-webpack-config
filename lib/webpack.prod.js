const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require('path')
const rootProject = process.cwd()
const configList = [baseConfig('production', rootProject)]

const prodConfig = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        styles: {
          name: 'styles',
          test: module => {
            return /^css/.test(module.type)
          },
          priority: 100,
          chunks: 'all',
          enforce: true
        },
        vendors: {
          test: module => {
            // exact css
            const name = module.nameForCondition()
            return /([\\/]node_modules[\\/])/.test(name) && !/^css/.test(module.type)
          },
          name: 'vendors',
          chunks: 'all',
          // 数值越大越优先
          priority: 300
        },
        commons: {
          test: module => {
            // exact css
            const name = module.nameForCondition()
            return !/\.s?css$/.test(name) && /^javascript/.test(module.type)
          },
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
          priority: 200
        }
      }
    }
  },
  stats: 'errors-only'
}
configList.push(prodConfig)

try {
  const { prod = {}, all = {} } = require(path.join(rootProject, '/waht-config'))
  configList.push(all, prod)
} catch {}
module.exports = merge(...configList)
