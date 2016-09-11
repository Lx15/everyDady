var gulp = require('gulp');
var  gulpSass = require('gulp-sass');


gulp.task('watch',function(){
  gulp.watch('*/*.scss',['styles'])
})
gulp.task('styles',function(){
  gulp.src("*/*.scss")
  .pipe(gulpSass({
    // outputStyle:'compressed'
  }))
  .pipe(gulp.dest('css'))
})