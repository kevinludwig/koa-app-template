var gulp = require('gulp'),
    nsp = require('gulp-nsp'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    eslint = require('gulp-eslint'),
    beautify = require('gulp-jsbeautify'),
    open = require('gulp-open'),
    del = require('del');

gulp.task('default', ['clean', 'beautify', 'eslint', 'cover', 'mocha']);
gulp.task('build', ['clean', 'eslint']);

gulp.task('coverage', () => {
    gulp.src('coverage/lcov-report/index.html')
        .pipe(open());
});

gulp.task('clean', () => {
    del.sync(['build', 'coverage', 'test-build']);
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

gulp.task('cover', ['eslint'], () => {
    return gulp.src('src/**/*.js')
        .pipe(istanbul())
        .pipe(gulp.dest('test-build'));
});

gulp.task('mocha', ['cover'], () => {
    return gulp.src('test-build/test/**/*.js')
        .pipe(mocha({
            bail: true
        }))
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({
            thresholds: {
                global: {
                    statements: 100,
                    branches: 90,
                    lines: 100,
                    functions: 100
                }
            }
        }));
});
