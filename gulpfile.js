const gulp = require("gulp"),
    sass = require('gulp-sass'),
    htmlhint = require('gulp-htmlhint'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    csslint = require('gulp-csslint'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    util = require('gulp-util'),
    run = require('run-sequence');

const PATHS = {
    EXTERNALS: {
        SRC: './bower_components',
        DEST: './public/vendor'
    },
    SCSS: {
        SRC: './public/css/scss/*.scss',
        DEST: './public/css/css'
    },
    HTML: {
        SRC: './public/app/components/*.html'
    },
    CSS: {
        SRC: './public/css/css/*.css',
        DEST: './public/css/css'
    },
    JS: {
        BACKEND: './server/**/*.js'
    }
};

gulp.task('default', () => {
    let htmlwatcher = gulp.watch(PATHS.HTML.SRC, ['html-validate']),
        //csswatcher = gulp.watch(PATHS.CSS.SRC, ['css']),
        sasswatcher = gulp.watch(PATHS.SCSS.SRC, ['sass']),
        jswatcher = gulp.watch(PATHS.JS.BACKEND, ['js']);
});

/* Development */

const AUTOPREFIXOPTIONS = {
    browsers: ['last 2 versions']
};

gulp.task('html-validate', () => {
    gulp.src(PATHS.HTML.SRC)
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.reporter("htmlhint-stylish"));
});

gulp.task('css', () => {
    gulp.src(PATHS.CSS.SRC)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(AUTOPREFIXOPTIONS))
        .pipe(csslint())
        .pipe(csslint.formatter())
        .pipe(cleancss({
            debug: true,
            compatibility: '*'
        }, (details) => {
            console.log(details.name + ": " + details.stats.originalSize);
            console.log(details.name + ": " + details.stats.minifiedSize);
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(PATHS.CSS.DEST));
});

gulp.task('sass', () => {
    gulp.src(PATHS.SCSS.SRC)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(PATHS.SCSS.DEST));
});

gulp.task('js', () => {
    gulp.src(PATHS.JS.BACKEND)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }));
});

/* Copy externals */

gulp.task('copy-externals', () => {
    gulp.src(PATHS.EXTERNALS.SRC + "/materialize/dist/**")
        .pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/materialize"));
    gulp.src(PATHS.EXTERNALS.SRC + "/material-icons/css/**")
        .pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/material-icons/css"));
    gulp.src(PATHS.EXTERNALS.SRC + "/jquery/dist/**")
        .pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/jquery"));
    gulp.src(PATHS.EXTERNALS.SRC + "/socket.io-client/dist/**")
        .pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/socket.io-client"));
    gulp.src(PATHS.EXTERNALS.SRC + "/fullpage.js/dist/**")
        .pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/fullpage.js"));
    gulp.src(PATHS.EXTERNALS.SRC + "/font-awesome/css/**")
        .pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/font-awesome/css"));
    gulp.src(PATHS.EXTERNALS.SRC + "/font-awesome/fonts/**")
        .pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/font-awesome/fonts"));
});

/* Unit testing */

gulp.task('testing', () => {
    run('mocha_backend_testing');
});

gulp.task('mocha_backend_testing', () => {
    gulp.src(['testing/backend/testing.js'], {
            read: false
        })
        .pipe(mocha({
            reporter: 'list'
        }))
        .on('error', util.log);
});