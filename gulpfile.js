var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var exec = require("child_process").exec;
var nib = require('nib');

var browsers = ["ff >= 19", "ie >= 8", "opera >= 11", "safari >= 5", "chrome >= 25", "android >= 4", "ios >= 6"];
var paths = {
    scripts: [
        'blocks/*.js',
        'blocks/**/*.js',
        'blocks/**/**/*.js'
    ],
    styl: [
        'blocks/*.styl',
        'blocks/**/*.styl'
    ]
};

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('static/js'))
        .pipe(uglify())
        .pipe(rename('_app.js'))
        .pipe(gulp.dest('static/js'));
});

gulp.task('css', function() {
    return gulp.src('blocks/blocks.styl')
        .pipe(stylus({
            use: nib(),
            compress: true
        }))
        .pipe(autoprefixer({
            browsers: browsers,
            cascade: false
        }))
        .pipe(rename('_autograph.css'))
        .pipe(gulp.dest('static/css'));
});

gulp.task('clean', function() {
    var cmd = 'rm -rf views static/{css,js}/';
    exec(cmd, function(err, stdout, stderr) {
        if (err) {
            cb(new Error(err), undefined);
            return;
        }
    });
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styl, ['css']);
});

gulp.task('default', ['css', 'scripts']);
