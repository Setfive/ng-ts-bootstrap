const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

gulp.task('default', function() {
  plugins.util.log("It worked!");
});