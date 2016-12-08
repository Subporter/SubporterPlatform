let gulp = require("gulp");

const PATHS = {
    EXTERNALS : {
        SRC: './bower_components',
        DEST: './public/vendor'
    }
};

/* Copy externals */

gulp.task("copy-externals", function () {
    gulp.src(PATHS.EXTERNALS.SRC + "/materialize/dist/**")
        .pipe(gulp.dest(PATHS.EXTERNALS.DEST +  "/materialize"));
    gulp.src(PATHS.EXTERNALS.SRC + "/jquery/dist/**")
        .pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/jquery"));
});