const tsconfig = require('./tsconfig.json')
module.exports = {
  "presets": ["@babel/preset-env", "@babel/preset-react", ["@babel/preset-typescript",tsconfig]]
}
