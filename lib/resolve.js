const path = require('path')
module.exports = srcRoot => {
  console.log(path.join(srcRoot, '/css'))
  return {
    alias: {
      '@': path.resolve(srcRoot),
      img: path.join(srcRoot, '/img'),
      css: path.join(srcRoot, '/css')
    },
    extensions: ['.ts', '.js', '.json', '.tsx']
  }
}
