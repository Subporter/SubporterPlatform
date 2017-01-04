let gulp = require("gulp"),
    sass = require('gulp-sass'),
    htmlhint = require('gulp-htmlhint'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    csslint = require('gulp-csslint'),
    uglify = require('gulp-uglify');

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
    }
};

gulp.task('default', function() {
    var htmlwatcher = gulp.watch(PATHS.HTML.SRC, ['html-validate']);
    //var csswatcher = gulp.watch(PATHS.CSS.SRC,['css']);
    var sasswatcher = gulp.watch(PATHS.SCSS.SRC, ['sass']);
});

const AUTOPREFIXOPTIONS = {
    browsers: ['last 2 versions']
};

gulp.task('sass', function() {
    gulp.src(PATHS.SCSS.SRC)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(PATHS.SCSS.DEST));
});

gulp.task('css', function() {
    gulp.src(PATHS.CSS.SRC)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(AUTOPREFIXOPTIONS))
        .pipe(csslint())
        .pipe(csslint.formatter())
        .pipe(cleanCSS({
            debug: true,
            compatibility: '*'
        }, function(details) {
            console.log(details.name + ": " + details.stats.originalSize);
            console.log(details.name + ": " + details.stats.minifiedSize);
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(PATHS.CSS.DEST));
});

gulp.task('html-validate', function() {
    gulp.src(PATHS.HTML.SRC)
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.reporter("htmlhint-stylish"));
});

/* Copy externals */

gulp.task("copy-externals", function() {
    gulp.src(PATHS.EXTERNALS.SRC + "/materialize/dist/**")
        .pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/materialize"));
    gulp.src(PATHS.EXTERNALS.SRC + "/material-icons/css/**")
        .pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/material-icons/css"));
    gulp.src(PATHS.EXTERNALS.SRC + "/jquery/dist/**")
        .pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/jquery"));
    gulp.src(PATHS.EXTERNALS.SRC + "/font-awesome/css/**")
        .pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/font-awesome/css"));
    gulp.src(PATHS.EXTERNALS.SRC + "/font-awesome/fonts/**")
        .pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/font-awesome/fonts"));
});