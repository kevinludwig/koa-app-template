var gulp = require('gulp'),
    nsp = require('gulp-nsp'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    eslint = require('gulp-eslint'),
    beautify = require('gulp-jsbeautify'),
    open = require('gulp-open'),
    del = require('del');

gulp.task('default', ['clean', 'beautify', 'eslint']);
gulp.task('build', ['clean', 'eslint']);

gulp.task('coverage', () => {
    gulp.src('coverage/lcov-report/index.html')
        .pipe(open());
});

gulp.task('clean', () => {
    del.sync(['coverage']);
});

gulp.task('nsp', ['clean'], (cb) => {
    nsp({
        package: __dirname + '/package.json'
    }, cb);
});

gulp.task('beautify', ['nsp'], () => {
    return gulp.src('./src/**/*.js')
        .pipe(beautify())
        .pipe(gulp.dest('./src'));
}); 

gulp.task('eslint', ['beautify'], () => {
    return gulp.src('./src/**/*.js')
        .pipe(eslint({
            useEslintrc: true
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
