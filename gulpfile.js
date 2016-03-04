var gulp = require('gulp');

////////////////////////////////////////////////

gulp.task('clean', clean);
gulp.task('copyImages', copyImages);
gulp.task('copy', ['copyImages']);
gulp.task('less', less);
gulp.task('templates', templates);
gulp.task('uglify', uglify);
gulp.task('wiredep', wiredep);
gulp.task('watch', watch);
gulp.task('serve', serve);

gulp.task('default', ['copy', 'less', 'wiredep', 'uglify', 'serve', 'watch']);

///////////////////////////////////////////////

function onError(err) {
    var notify = require('gulp-notify');
    notify.onError({
        title:    'Gulp',
        subtitle: 'Failure!',
        message:  'Error: <%= error.message %>'
    })(err);
    this.emit('end');
};

function clean() {
    var del = require('del');

    return del('build');
}

function copyImages() {
    var plumber = require('gulp-plumber');

    return gulp.src('src/skin/img/**', {base: 'src/skin'})
        .pipe(plumber({errorHandler: onError}))
        .pipe(gulp.dest('build'));
}

function less() {
    var concat = require('gulp-concat');
    var less = require('gulp-less');
    var lesshint = require('gulp-lesshint');
    var livereload = require('gulp-livereload');
    var plumber = require('gulp-plumber');
    var sourcemaps = require('gulp-sourcemaps');
    var rename = require('gulp-rename');

    return gulp.src(['src/index.less', 'src/vars.less', 'src/**/*.module.less',  'src/skin/less/app.vars.less'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(lesshint())
        .pipe(lesshint.reporter())
        .pipe(sourcemaps.init())
        .pipe(concat('temp.less'))
        .pipe(less({paths: ['bower_components']}))
        .pipe(rename('pf-cards.css'))
        .pipe(livereload())
        .pipe(gulp.dest('build'));
}

function templates() {
    var livereload = require('gulp-livereload');
    var plumber = require('gulp-plumber');
    var ngTemplates = require('gulp-ng-templates');

    return gulp.src('src/**/*.html')
        .pipe(plumber({errorHandler: onError}))
        .pipe(ngTemplates())
        .pipe(livereload())
        .pipe(gulp.dest('./'));
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
    var livereload = require('gulp-livereload');
    var plumber = require('gulp-plumber');
    var notify = require('gulp-notify');
    var rename = require('gulp-rename');
    var annotate = require('gulp-ng-annotate');
    var sourcemaps = require('gulp-sourcemaps');
    var uglify = require('gulp-uglify');

    return gulp.src(['src/app.module.js', 'src/**/*.module.js', 'src/**/*.js'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(annotate())
        .pipe(concat('app.concat.js'))
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(livereload())
        .pipe(gulp.dest('build'))
}

function watch() {
    var livereload = require('gulp-livereload');

    livereload.listen();
    gulp.watch(['src/**/*.less'], ['less']);
    gulp.watch(['src/app.index.html'], ['wiredep']);
    gulp.watch(['!src/app.index.html', 'src/**/*.html'], ['templates']);
    gulp.watch(['src/**/*.js'], ['uglify']);
}

function wiredep() {
    var plumber = require('gulp-plumber');
    var rename = require('gulp-rename');
    var wiredep = require('wiredep').stream;

    return gulp.src('src/app.index.html')
        .pipe(plumber({errorHandler: onError}))
        .pipe(wiredep())
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
}
