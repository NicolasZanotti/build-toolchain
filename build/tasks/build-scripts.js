const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('../configuration/webpack');
const globs = require('../configuration/globs');
const log = require('fancy-log');

module.exports = function buildScriptsTask(gulp, done) {
	return gulp.src(globs.FOLDER_SRC)
		.pipe(
			webpackStream(webpackConfig, webpack)
		)
		.on('error', error => {
			log.error(error);
			done();
		})
		.pipe(
			gulp.dest(globs.FOLDER_DIST)
		);
}
