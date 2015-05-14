'use strict';

var webpack = require('webpack');
var update  = require('react/lib/update');
var argv    = require('minimist')(process.argv.slice(2));


var DEBUG = !argv.release;
var AUTOPREFIXER_LOADER = 'autoprefixer-loader?{browsers:[' +
  '"Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", ' +
  '"Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';

var piDefine = new webpack.DefinePlugin({
  'process.env.NODE_ENV': DEBUG ? '\"development\"' : '\"production\"',
  '__DEV__': DEBUG,
  '__SERVER__': false
});
var piCommonChunk = new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js');
var piContextReplacement = new webpack.ContextReplacementPlugin(/react$/, '~/react/dist/react');
var piUglify = new webpack.optimize.UglifyJsPlugin({
  minimize: true,
  compress: {
    warnings: false
  }
});
var piOccurenceOnce = new webpack.optimize.OccurenceOrderPlugin();
var piAggressiveMerging = new webpack.optimize.AggressiveMergingPlugin();
var piDebupe = new webpack.optimize.DedupePlugin();

var config = {
  output: {
    path: './build/'
  },
  config: DEBUG,
  cache: DEBUG,
  devtool: DEBUG ? '#cheap-source-map' : false,
  debug: DEBUG,
  stats: {
    colors: true,
    reason: DEBUG,
    times: true
  },
  node: {
    console: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [ piOccurenceOnce ],
  module: {
    /*
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint'
      }
    ],*/
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?minimize!' + AUTOPREFIXER_LOADER
      },
      {
        test: /\.less$/,
        loader: 'style!css?minimize!' + AUTOPREFIXER_LOADER +'!less'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel?stage=0'
      },
      {
        test: /\.(gif|jpg|png)$/,
        loader: 'file'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      }
    ]
  }
};

// Configuration for the client-side bundle
var appConfig = update(config, {
  entry: {
    $set: {
      app: './src/js/app/app.jsx'
    }
  },
  output: {
    filename: {$set: 'app.js'}
  },
  plugins: {
    $push: [ piDefine ]
    .concat(DEBUG ? [] : [ piDebupe, piUglify, piAggressiveMerging ])
  }
});

module.exports = [appConfig];
