var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

// Default runner
gulp.task('default', ['html','css','js']);

gulp.task('html', function() {
    gulp.src('./index.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('css', function() {
    gulp.src('./css/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public'));
});

gulp.task('js', function() {
  gulp.src('./js/main.js')
  .pipe(browserify())
  // .pipe(uglify())
  .pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
  gulp.watch('./css/*.scss', ['css']);
  gulp.watch('./index.html', ['html']);
  gulp.watch('./js/*.js', ['js']);
});
