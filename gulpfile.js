var gulp = require('gulp');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');

gulp.task('webpack', function() {
    return gulp.src('src/main.js')
        .pipe(webpack({
        	output: {
        		filename: 'built.js'
        	},
        	debug: false
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
    gulp.watch('src/*.js', ['webpack']);
});

gulp.task('default', ['webpack', 'watch']);