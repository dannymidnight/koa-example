var gulp = require('gulp');
var livereload = require('gulp-livereload');
var addFileToManifest = require('./manifest').addFileToManifest;
var path = require('path');
var consts = require('./consts');
var gutil = require('gulp-util');
var { webpackWatch, webpackDevServer } = require('./js');

module.exports = function() {
  // Start livereload server
  livereload.listen();

  // Watch the entire public directory for changes
  gulp.watch(path.join(consts.DIST_DIR, '/**/*')).on('change', function(file) {
    addFileToManifest(file.path);
  });

  // Start watch tasks
  require('./css').watch();
  require('./lint').watch();
  require('./images').watch();

  if (gutil.env.karma) {
    require('./karma').watch();
  }

  if (gutil.env['dev-server']) {
    webpackDevServer();
  } else {
    webpackWatch();
  }
};
