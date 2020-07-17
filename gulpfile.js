var gulp = require('gulp'),
    sass = require('gulp-sass');
    uglify = require('gulp-uglify');
    rename = require('gulp-rename');
    img = require('gulp-imagemin');
    minify = require('gulp-csso');
    concat = require('gulp-concat');
    browserSync = require('browser-sync').create();

function browser_sync(){
    browserSync.init({
        browser: 'firefox',
        server: {
            baseDir: 'build/'
        }
    });
}

function reload(cb){
    browserSync.reload();
    cb();
}

function style(cb){
    gulp.src('source/sass/**/*.sass')
    .pipe(sass())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.stream());
    cb();
}

function scripts(cb){
    gulp.src('source/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js/'));
    cb();
}

function vendors(cb){
    gulp.src('source/js/vendors/*.js')
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js/vendors/'));
    cb();
}

function images(cb){
    gulp.src('source/img/*')
    .pipe(img())
    .pipe(gulp.dest('build/img/'));
    cb();
}

function watch(){
    gulp.watch('source/sass/**/*.sass', gulp.series(style,reload))
    gulp.watch('source/js/*.js', gulp.series(scripts, reload))
    gulp.watch('source/js/vendors/*.js', gulp.series(vendors, reload))
    gulp.watch('build/*.html', reload);
};

gulp.task('style', style);
gulp.task('images', images);
gulp.task('scripts', scripts);
gulp.task('vendors', vendors);
gulp.task('watch', gulp.parallel(browser_sync, watch));
