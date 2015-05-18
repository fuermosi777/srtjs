var gulp = require('gulp');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var less = require('gulp-less');

gulp.task('webpack', function() {
    return gulp.src('src/main.js')
        .pipe(webpack({
        	output: {
        		filename: 'built.js'
        	},
        	debug: true
        }))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('less', function() {
    return gulp.src('src/main.less')
        .pipe(less())
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
    gulp.watch('src/*.js', ['webpack']);
    gulp.watch('src/*.less', ['less']);
});

gulp.task('default', ['webpack', 'less', 'watch']);

