'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('bulid', () => {
  return gulp.src('amazeui-pagination.js')
    .pipe(uglify())
    .pipe(rename('amazeui-pagination.min.js'))
    .pipe(gulp.dest('./'));
});