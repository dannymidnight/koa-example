var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var print = require('gulp-print');
var path = require('path');
var livereload = require('gulp-livereload');
var grapher = require('sass-graph');
var consts = require('./consts');
var cssmin = require('gulp-minify-css');
var gutil = require('gulp-util');

var CSS_DIR = path.join(consts.ASSETS_DIR, 'css');
var CSS_OUTPUT_DIR = path.join(consts.DIST_DIR, 'css');
var INCLUDE_PATHS = ['static/css', 'static/bower_components'];

// Include global settings based on the current environment.
if (consts.PRODUCTION) {
  INCLUDE_PATHS.push('static/css/vars/production');
} else {
  INCLUDE_PATHS.push('static/css/vars/development');
}

// High-order function for creating a gulp task that compiles a scss glob.
function compile(glob) {
  return function() {
    return gulp.src(glob)
      .pipe(sass({
        includePaths: INCLUDE_PATHS
      }))
      .on('error', function(err) {
        gutil.beep();
        if (consts.PRODUCTION) {
          throw err;
        } else {
          gutil.log(err);
        }
      })
      .pipe(prefix({
        browsers: [
          'last 2 version',
          'firefox esr',
          'opera 12.1',
          'android 4',
          'explorer 9'
        ],
        cascade: false
      }))
      .pipe(consts.PRODUCTION ? cssmin({
        processImport: false,
        rebase: false,
        restructuring: false
      }) : gutil.noop())
      .pipe(gulp.dest(CSS_OUTPUT_DIR))
      .pipe(livereload())
      .pipe(print(function(filepath) {
        return 'built: ' + filepath;
      }));
  };
}

module.exports = compile(path.join(CSS_DIR, '*.scss'));

module.exports.watch = function() {
  var graph = grapher.parseDir('./static/css', {
    loadPaths: INCLUDE_PATHS
  });

  gulp.watch(path.join(CSS_DIR, '/**/*.scss'), function(event) {
    if (!path.basename(event.path).match(/^_/)) {
      compile(event.path)();
    }

    graph.visitAncestors(event.path, function(parent) {
      if (path.basename(parent).match(/^_/)) {
        return;
      }
      compile(parent)();
    });
  });
};
