'use strict'
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = {
  mode: 'production',
  entry: {
    extlib: [
      'vue',
      'vue-router',
      'vuex',
      'element-ui',
    ]
  },
  output: {
    path: path.join(__dirname, '../dll'),
    filename: '[name].dll.[chunkhash].js',
    library: '[name]'
  },
  plugins: [
    new ProgressBarPlugin(),
    new CleanWebpackPlugin([
      'dll'
    ], {
      root: path.resolve(__dirname, '../')
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dll', '[name]-manifest.json'),
      name: '[name]'
    }),
    new ParallelUglifyPlugin({
      sourceMap: false,
      uglifyES: {
        output: {
          comments: false
        },
        compress: {
          warnings: false,
          drop_console: true
        }
      }
    })
  ]
};
