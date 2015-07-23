var gulp = require('gulp');
var path = require('path');
var consts = require('./consts');
var imagemin = require('gulp-imagemin');

function syncImages() {
  return gulp.src(path.join(consts.ASSETS_DIR, 'images/**/*'))
    .pipe(gulp.dest(path.join(consts.DIST_DIR, 'images')));
}

// Sync all app images
module.exports = syncImages;

module.exports.watch = function() {
  gulp.watch(path.join(consts.ASSETS_DIR, 'images/**/*'), syncImages);
};

// Optimize app images
module.exports.optimize = function() {
  return gulp.src(path.join(consts.ASSETS_DIR, 'images/**/*'))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest(path.join(consts.ASSETS_DIR, 'images')));
};
