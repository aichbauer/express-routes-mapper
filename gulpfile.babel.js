import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

gulp.task('default', () => {
  return gulp.src('./lib/index.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});
