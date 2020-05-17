const { task, src, dest, series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

task('sass', () => {
    return src([
      'node_modules/bootstrap/scss/bootstrap.scss',
      'src/scss/*.scss'
    ])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(dest('src/css'))
    .pipe(browserSync.stream());
  });
  
  task('js', () => {
    return src([
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js',
    ])
    .pipe(dest('src/js'))
    .pipe(browserSync.stream());
  });
  
  task('serve', series('sass', () => {
    browserSync.init({
      server: './src',
    });
  
    watch([
      'node_modules/bootstrap/scss/bootstrap.scss',
      'src/scss/*.scss'
    ], series('sass'));
  
    watch('src/*.html').on('change', browserSync.reload);
  
  }));

task('default', parallel('js', 'serve') );