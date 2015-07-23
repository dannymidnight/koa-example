var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var conf = require('../webpack.conf.js');
var gutil = require('gulp-util');
var assign = require('lodash').assign;
var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var consts = require('./consts');
var path = require('path');

var INPUT_JS_DIR = path.join(consts.ASSETS_DIR, 'js/**/*.js');

var build = function(options) {
  return gulp.src(INPUT_JS_DIR)
    .pipe(webpackStream(assign(conf, options), webpack))
    .on('error', function(err) {
      gutil.log(err.message);
      // http://nodejs.org/api/process.html#process_exit_codes
      process.exit(3);
    })
    .pipe(gulp.dest(conf.output.path));
};

module.exports = function() {
  build({
    // Force compilation failures to exit.
    bail: true
  });
};

module.exports.webpackDevServer = function() {
  var config = Object.create(conf);
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  // Add hot-module loader code to each bundle
  Object.keys(config.entry).forEach(function(name) {
    config.entry[name] = [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server'
    ].concat(config.entry[name]);
  });

  // Add the public path for compiled entry bundles
  config.module = require('../webpack/module.hot.js');
  config.output.publicPath = 'http://localhost:8080/start/dist/js/';

  var server = new WebpackDevServer(webpack(config), {
    hot: true,
    publicPath: 'http://localhost:8080/start/dist/js/',
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  });

  server.listen(8080, 'localhost', function(err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
  });
};

module.exports.webpackWatch = function() {
  build({
    watch: true,
    bail: false
  });
};
