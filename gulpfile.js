let gulp = require('gulp');

let babelify = require('babelify');
let browserify = require('browserify');
let buffer = require('vinyl-buffer');
let livereload = require('gulp-livereload');
let sass = require('gulp-sass');
let source = require('vinyl-source-stream');
let sourcemaps = require('gulp-sourcemaps');
let uglify = require('gulp-uglify');

function handleError(err) {
    console.log(err);
    this.emit('end');
}

gulp.task('js', () => {
    return browserify({entries: './src/js/main.js', debug: true})
        .transform("babelify", {
            plugins: [['angularjs-annotate', {explicitOnly: true}]],
            presets: ["es2015"],
        })
        .on('error', handleError)
        .bundle()
        .on('error', handleError)
        .pipe(source('main.min.js'))
        .on('error', handleError)
        .pipe(buffer())
        .on('error', handleError)
        .pipe(sourcemaps.init())
        .on('error', handleError)
        .pipe(uglify())
        .on('error', handleError)
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./static/js/'));
});

gulp.task('css', () => {
    return gulp.src('./src/scss/main.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .on('error', handleError)
        .pipe(gulp.dest('./static/css'))
});

gulp.task('watch', ['css', 'js'], () => {
    gulp.watch('./static-src/scss/**/*.scss', ['css']).on('error', handleError);
gulp.watch('./static-src/js/**/*.js', ['js']).on('error', handleError);
});

gulp.task('default', ['watch']);