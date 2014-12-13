var gulp    = require('gulp'),
	ts      = require('gulp-typescript'),
	jasmine = require('gulp-jasmine');

var paths = {
	src: 'src',
	spec: 'spec'
};

var globs = {
	src: 'src/**/*.ts',
	spec: 'spec/**/*.ts'
};

gulp.task('compile', function() {
	return gulp.src(globs.src)
		.pipe(ts())
		.js
		.pipe(gulp.dest(paths.src));
});

gulp.task('test', ['compile'], function() {
	return gulp.src(globs.spec)
		.pipe(ts())
		.js
		.pipe(gulp.dest(paths.spec))
		.pipe(jasmine());
});

gulp.task('dev', function() {
	gulp.watch(globs.src, ['compile', 'test']);
	gulp.watch(globs.spec, ['test']);
});

gulp.task('default', ['compile', 'test']);
