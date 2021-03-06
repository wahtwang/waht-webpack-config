const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const path = require('path')
const glob = require('glob')
const resolveConfig = require('./resolve')
module.exports = (mode, rootProject) => {
  function setMpa () {
    const entry = {}
    const htmlWebpackPlugins = []
    let srcRoot
    const entryFiles = glob.sync(path.join(rootProject + '/**/src/**/index.ts'), { ignore: [path.join(rootProject + '/node_modules/**')] })
    entryFiles.forEach(item => {
      const entryName = item.match(/([^/]*)\/index.ts$/)[1]
      entry[entryName] = item
      !srcRoot && (srcRoot = item.replace(/(\/src\/).*/, '$1'))
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.join(srcRoot + '../index.html'),
          filename: `${entryName}.html`,
          thunks: ['vendors', 'commons', entryName],
          minify: {
            // 删掉注释
            removeComments: true
          }
        })
      )
    })
    return { entry, htmlWebpackPlugins, srcRoot }
  }
  const { entry, htmlWebpackPlugins, srcRoot } = setMpa()
  const lessLoader = [
    mode === 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: mode === 'production' ? '[hash:base64:8]' : '[path][name]__[local]--[hash:base64:5]'
          // importLoaders: 1, //仅对未进行解析的@import有作用
        },
        // 驼峰也可以用，原来的也可以用
        localsConvention: 'camelCase'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => {
          const softConfig = {
            viewportWidth: 375
          }
          const plugins = [require('autoprefixer')({ autoprefixer: { browsers: ['> 1% in CN'] } }), require('postcss-px-to-viewport')(softConfig)]
          mode === 'production' && plugins.push(require('cssnano')({ preset: ['default'] }))
          return plugins
        }
      }
    },
    'less-loader'
  ]
  return {
    resolve: resolveConfig(srcRoot),
    mode: mode,
    entry: entry,
    output: {
      path: path.join(rootProject, '/build'),
      filename: '[name].[hash:10].js'
    },
    module: {
      rules: [
        {
          test: /\.tsx|\.ts$/,
          use: ['babel-loader']
        },
        {
          test: /\.less$/,
          use: lessLoader
        },
        {
          test: /\.(png|jpg|gif|jpeg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10240
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name]_[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      function () {
        this.hooks.done.tap('done', stats => {
          if (
            stats.compilation.console &&
            stats.compilation.console.errors &&
            stats.compilation.errors.length &&
            process.argv.indexOf('--watch') === -1
          ) {
            console.log('build error')
            // 设置错误码
            process.exit(1)
          }
        })
      },
      new MiniCssExtractPlugin({ filename: '[name]_[contenthash:8].css' })
    ].concat(htmlWebpackPlugins)
  }
}
