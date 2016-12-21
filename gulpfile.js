let gulp = require("gulp");

const PATHS = {
	EXTERNALS: {
		SRC: './bower_components',
		DEST: './public/vendor'
	}
};

/* Copy externals */

gulp.task("copy-externals", function () {
	gulp.src(PATHS.EXTERNALS.SRC + "/materialize/dist/**")
		.pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/materialize"));
	gulp.src(PATHS.EXTERNALS.SRC + "/material-icons/css/**")
		.pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/material-icons/css"));
	gulp.src(PATHS.EXTERNALS.SRC + "/jquery/dist/**")
		.pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/jquery"));
	gulp.src(PATHS.EXTERNALS.SRC + "/fullpage.js/dist/**")
		.pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/fullpage.js"));
	gulp.src(PATHS.EXTERNALS.SRC + "/font-awesome/css/**")
		.pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/font-awesome/css"));
	gulp.src(PATHS.EXTERNALS.SRC + "/font-awesome/fonts/**")
		.pipe(gulp.dest(PATHS.EXTERNALS.DEST + "/font-awesome/fonts"));
});