const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const nodeModulesPath = path.resolve(__dirname, 'node_modules')
const isProduction = process.env.NODE_ENV == 'production'

const config = {
  entry: {
    vendors: [
      'react',
      'react-dom',
      'babel-polyfill'
    ],
    app: [
      path.resolve(__dirname, 'src', 'Index.tsx')
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
    modules: ['node_modules']
  },
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre', // 分类，preloader
        loader: 'tslint-loader',
        options: { emitErrors: true }
      },
      {
        test: /\.tsx?$/,
        loaders: ['babel-loader?cacheDirectory', 'awesome-typescript-loader?tsconfig=tsconfig.json&useCache=true']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?minimize']
      },
      {
        test: /\.(jpg|png|woff|eot|ttf|svg|gif)$/,
        loader: "file-loader?name=[name].[hash].[ext]"
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: '[name].[hash].js' }),
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new webpack.DefinePlugin({ DEBUG: true })
  ]
}

if (isProduction) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }))
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': { NODE_ENV: '"prodection"' },
    DEBUG: false
  }))
}

module.exports = config