var gulp = require('gulp');
var eslint = require('gulp-eslint');
var consts = require('./consts');
var path = require('path');
var gutil = require('gulp-util');

const JS_PATH = path.join(consts.ASSETS_DIR, 'js/**/*.{jsx,js}');

function lintJavascript() {
  return gulp.src(JS_PATH)
    .pipe(eslint({
      useEslintrc: true
    }))
    .pipe(eslint.format())
    .pipe(consts.PRODUCTION ? eslint.failAfterError() : gutil.noop());
}

module.exports = lintJavascript;

module.exports.watch = function() {
  gulp.watch(JS_PATH, function(file) {
    gulp.src(file.path)
      .pipe(eslint({
        useEslintrc: true
      }))
      .pipe(eslint.format());
  });
};
