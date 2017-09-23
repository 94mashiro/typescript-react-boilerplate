const webpack = require('webpack')
const { Config } = require('webpack-config')
const path = require('path')

const mainConfig = new Config().extend('webpack.config')
mainConfig.module.rules = []

const devConfigExtension = {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8848',
      'webpack/hot/only-dev-server'
    ]
  },
  output: {
    filename: '[name].js',
    publicPath: 'http://localhost:8848'
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: { emitErrors: true },
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.tsx?$/,
        loaders: ['react-hot-loader', 'babel-loader?cacheDirectory', 'awesome-typescript-loader?tsconfig=tsconfig.json&useCache=true']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|woff|eot|ttf|svg|gif)$/,
        loader: "file-loader?name=[name].[ext]"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      DEBUG: true
    })
  ]
}

module.exports = mainConfig.merge(devConfigExtension)