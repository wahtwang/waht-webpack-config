const path = require('path')
module.exports = srcRoot => {
  return {
    alias: {
      '@': path.resolve(srcRoot),
      img: path.join(srcRoot, '/imgs'),
      css: path.join(srcRoot, '/css'),
      '#': path.join(srcRoot, '/components')
    },
    extensions: ['.ts', '.js', '.json', '.tsx']
  }
}
