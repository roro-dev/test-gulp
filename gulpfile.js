var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    minify = require('gulp-minify'),
    livereload = require('gulp-livereload')
    ;

gulp.task('sass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
});

gulp.task('min-js', function () {
    return gulp.src('src/js/*.js')
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            ignoreFiles: ['*.min.js']
        }))
        .pipe(gulp.dest('public/js'))
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('src/scss/*.scss', gulp.series('sass'))
        .on('change', function (event) {
            console.log(event);
        });
    gulp.watch('src/js/*.js', gulp.series('min-js'))
        .on('change', function (event) {
            console.log(event);
        });
    gulp.watch(['*.html', 'src/js/*.js', 'src/scss/*.scss'])
        .on('change', function (event) {
            console.log(event);
        });
});

gulp.task('default', gulp.series('watch'));
