var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

// Default runner
gulp.task('default', ['html','css','js']);

gulp.task('html', () => {
    gulp.src('./index.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('css', () => {
    gulp.src('./css/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public'));
});

gulp.task('js', () => {
  gulp.src('./js/main.js')
  .pipe(babel({
			presets: ['es2015']
		}))
  .pipe(browserify())
  // .pipe(uglify())
  .pipe(gulp.dest('./public'));
});

gulp.task('watch', () => {
  gulp.watch('./css/*.scss', ['css']);
  gulp.watch('./index.html', ['html']);
  gulp.watch('./js/*.js', ['js']);
});
