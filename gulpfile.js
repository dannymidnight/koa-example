require('babel/register');

var gulp = require('gulp');
var runSequence = require('run-sequence');

//= Build tasks
gulp.task('js', require('./gulp/js'));
gulp.task('css', require('./gulp/css'));
gulp.task('manifest', require('./gulp/manifest'));
gulp.task('images', require('./gulp/images'));
gulp.task('clean', require('./gulp/clean'));
gulp.task('lint', require('./gulp/lint'));

//= Development tasks
gulp.task('watch', require('./gulp/watch'));
gulp.task('build', function(callback) {
    runSequence('clean', ['js', 'css', 'images'], 'manifest', callback);
});

//= Default tasks
gulp.task('default', ['build']);
