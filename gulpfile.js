var gulp = require('gulp');
var debug = require('gulp-debug');
////////////////////////////////////////////////

gulp.task('copyImages', copyImages);
gulp.task('copy', ['copyImages']);

gulp.task('less', less);
gulp.task('serve', serve);
gulp.task('uglify', uglify);
gulp.task('watch', watch);
gulp.task('default', ['less', 'serve', 'watch']);

///////////////////////////////////////////////

function onError(err) {
    var notify = require('gulp-notify');
    notify.onError({
        title:    'Gulp',
        subtitle: 'Failure!',
        message:  'Error: <%= err.message %>'
    })(err);
    this.emit('end');
};

function copyImages() {
    var plumber = require('gulp-plumber');

    return gulp.src('src/skin/img/**', {base: 'src/skin'})
        .pipe(plumber({errorHandler: onError}))
        .pipe(gulp.dest('build'));
}

function less() {
    var concat = require('gulp-concat');
    var less = require('gulp-less');
    var plumber = require('gulp-plumber');
    var sourcemaps = require('gulp-sourcemaps');
    var rename = require('gulp-rename');

    return gulp.src(['src/index.less', 'src/vars.less', 'src/**/index.less',  'src/skin/less/app.vars.less'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(concat('temp.less'))
        .pipe(less({paths: ['bower_components']}))
        .pipe(rename('pf-cards.css'))
        .pipe(gulp.dest('build'))
        .pipe(debug())
        ;
}

function templates() {
    var plumber = require('gulp-plumber');
    var ngTemplates = require('gulp-ng-templates');

    return gulp.src('src/**/*.hmtl')
        .pipe(plumber({errorHandler: onError}))
        .pipe(ngTemplates())
        .pipe(gulp.dest('build'));
}

function serve() {
    var connect = require('gulp-connect');

    connect.server({
        root: './',
        port: '3000',
        livereload: true
    });
}

function uglify() {
    var concat = require('gulp-concat');
    var plumber = require('gulp-plumber');
    var notify = require('gulp-notify');
    var rename = require('gulp-rename');
    var sourcemaps = require('gulp-sourcemaps');
    var uglify = require('gulp-uglify');

    return gulp.src(['src/app.module.js', 'src/**/*.module.js', 'src/**/*.js'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(concat('app.concat.js'))
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build'))
}

function watch() {
    gulp.watch(['app/**/*.less'], ['less']);
}
