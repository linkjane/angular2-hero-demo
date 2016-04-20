var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


// Webpack Config
var webpackConfig = {
  entry: {
    'polyfills': './polyfills.ts',
    'vendor':  './vendor.ts',
    'main': './app/main.ts'
  },

  output: {
    path: './dist',
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      }
    }),
    new ExtractTextPlugin('[name].css')
  ],

  module: {
    loaders: [
      // .ts files for TypeScript
      { test: /\.ts$/, loader: 'awesome-typescript-loader' },
      {test: /\.(scss|css)$/, loader: ExtractTextPlugin.extract('style', 'css!sass'), exclude: 'node_modules'},
      {test: /\.(png|gif|jpe?g|svg)$/, loader: 'url?limit=20000'}
    ]
  }

};

















// Our Webpack Defaults
var defaultConfig = {
  devtool: 'cheap-module-eval-source-map',
  cache: true,
  debug: true,
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          path.join(__dirname, 'node_modules', 'rxjs'),
          path.join(__dirname, 'node_modules', '@angular2-material'),
        ]
      }
    ],
    noParse: [
      path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
      path.join(__dirname, 'node_modules', 'angular2', 'bundles')
    ]
  },

  resolve: {
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.js']
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },

  node: {
    global: 1,
    crypto: 'empty',
    module: 0,
    Buffer: 0,
    clearImmediate: 0,
    setImmediate: 0
  },
}

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
