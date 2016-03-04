var gulp = require('gulp');

function onError(err) {
    var notify = require('gulp-notify');
	notify.onError({
		title:    'Gulp',
		subtitle: 'Failure!',
		message:  'Error: <%= err.message %>'
	})(err);
	this.emit('end');
};

function uglify() {
    var concat = require('gulp-concat');
    var plumber = require('gulp-plumber');
    var notify = require('gulp-notify');
    var rename = require('gulp-rename');
    var sourcemaps = require('gulp-sourcemaps');
    var uglify = require('gulp-uglify');

    return gulp.src(config.src.scripts)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(concat('app.concat.js'))
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build'))
}

function less() {
    var concat = require('gulp-concat');
    var less = require('gulp-less');
    var plumber = require('gulp-plumber');
    var sourcemaps = require('gulp-sourcemaps');
    var rename = require('gulp-rename');

    return gulp.src(['src/index.less', 'src/vars.less', 'src/*.module.less',  'src/**/*.less'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(concat('temp.less'))
        .pipe(less({paths: ['bower_components']}))
        .pipe(rename('pf-cars.css'))
        .pipe(gulp.dest('build'));
}

function templates() {
    var plumber = require('gulp-plumber');
    var ngTemplates = require('gulp-ng-templates');

    return gulp.src('src/**/*.hmtl')
        .pipe(plumber({errorHandler: onError}))
        .pipe(ngTemplates())
        .pipe(gulp.dest('build'));
}
