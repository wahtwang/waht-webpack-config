const prodConfig = require('./lib/webpack.prod')
const devConfig = require('./lib/webpack.dev')

module.exports = (mode) => {
  switch (mode) {
    case 'development':
      return devConfig
    case 'production' :
      return prodConfig
  }
}
