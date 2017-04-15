var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');
var Html = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

var TARGET = process.env.npm_lifecycle_event;

var config = {
  entry: '',
  path: '',
  filename: '',
  plugins: [],
  externals: {}
};

if (TARGET === 'dist' || TARGET === 'dist-min') {
  config.entry += './src/TicTacToe.js';
  config.path += './dist';
  config.filename += 'TicTacToe';
  config.externals.react = 'react';
}

if (TARGET === 'dist') {
  config.filename += '.js';
}

if (TARGET === 'dist-min') {
  config.filename += '.min.js';
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
    })
  ]);
}

if (TARGET === 'gh-pages') {
  config.entry += './index.js';
  config.path += './demo';
  config.filename += 'bundle.js';
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
    }),
    new Clean(['demo']),
    new Html({
      template: './public/index.html',
      inject: false,
      filename: 'index.html'
    })
  ]);
}

module.exports = {
  entry: config.entry,
  output: {
    path: config.path,
    filename: config.filename,
    libraryTarget: 'umd',
    library: 'TicTacToe'
  },
  externals: config.externals,
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.scss$/, loader: 'style!css!postcss!sass' },
      { test: /\.css$/, loader: 'style!css!postcss' }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  postcss: [autoprefixer],
  plugins: config.plugins
};
