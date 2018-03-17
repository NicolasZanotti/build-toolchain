const del = require('del');
const log = require('fancy-log');
const wrap = require('ansi-wrap');
const globs = require('../configuration/globs');
const state = require('../state');

/*

☛ All the compilaton tasks should require the completion
of this task first. E.g. `gulp.task('build', ['clean'])`

*/
module.exports = function cleanTask(gulp, done) {
	// Don't clean assets while the watch task is running.
	if (state.isWatching) return done();

	del(globs.FILES_COMPILED, {cwd: globs.FOLDER_DIST})
		.then((globs) => {
			log(
				wrap(33, 39, `Deleted ${globs.length} compiled files...`)
			);
			done();
		});
};
