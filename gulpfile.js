var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

var site_name = '';

//browser sync
gulp.task('browser-sync', ['sass', 'templates'], function() {
    browserSync.init({
        proxy: site_name
    });
});

//move templates
gulp.task('templates', function(){
  return gulp.src('src/templates/**/*')
    .pipe(gulp.dest('craft/templates'))
    .pipe(browserSync.reload({stream:true}))
});

//compile sass
gulp.task('sass', function () {
    return gulp.src('src/scss/styles.scss')
        .pipe(sass({
            includePaths: ['node_modules/node.normalize.scss','_scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cssnano())
        .pipe(gulp.dest('public/assets/css'))
        .pipe(browserSync.reload({stream:true}))
});

//watch
gulp.task('watch', function () {
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/**/*.html', ['templates']);
});

//default task
gulp.task('default', ['browser-sync', 'watch']);
