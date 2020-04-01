const path = require('path')
const webpack = require('webpack')
process.chdir(path.join(__dirname, '/template'))
webpack(require('../../lib/webpack.prod'), (e, state) => {
  if (e) {
    console.log(e)
  }
  console.log(state && state.toString({ colors: true, modules: false, children: false }))
})
