const gulp = require('gulp');
const path = require('path');
const rev = require('gulp-rev');
const through = require('through2');
const consts = require('./consts');
const override = require('gulp-rev-css-url');

const MANIFEST = 'manifest.json';

const skipAlreadyHashed = function() {
  return through.obj((file, enc, cb) => {
    if (file.isNull() || file.revOrigPath.match(file.revHash)) {
      return cb();
    } else {
      return cb(null, file);
    }
  });
};

module.exports = function() {
  return gulp
    .src(
      path.join(consts.DIST_DIR, '**/*.{js,css}'),
      { base: consts.DIST_DIR }
    )
    .pipe(rev())
    .pipe(override())
    .pipe(skipAlreadyHashed())
    .pipe(gulp.dest(consts.DIST_DIR))
    .pipe(rev.manifest(MANIFEST))
    .pipe(gulp.dest(consts.DIST_DIR));
};

// Merge a single file into an existing manifest file.
// This is useful for a development watcher tasks so that the manifest step stays fast.
module.exports.addFileToManifest = function(file) {
  return gulp.src(file, { base: consts.DIST_DIR })
    .pipe(rev())
    .pipe(skipAlreadyHashed())
    .pipe(gulp.dest(consts.DIST_DIR))
    .pipe(rev.manifest(MANIFEST, {
      cwd: consts.DIST_DIR,
      merge: true
    }))
    .pipe(gulp.dest(consts.DIST_DIR));
};
