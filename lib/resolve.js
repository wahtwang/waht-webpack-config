const path = require('path')

module.exports = {
  alias: {
    '@': path.resolve(__dirname, '../src'),
    img: path.join(__dirname, '../src/img'),
    css: path.join(__dirname, '../src/css'),
    vue$: 'vue/dist/vue.runtime.esm.js'
  },
  extensions: ['.ts', '.js', '.vue', '.json', '.tsx'],
  // 替换extensions的空字符串 https://webpack.js.org/configuration/resolve/#resolve-enforceextension
  enforceExtension: false
}
