const log = require('fancy-log');
const notify = require("gulp-notify");
const globs = require('../configuration/globs');
const state = require('../state');

const watchOptions = {
	cwd: globs.FOLDER_SRC,
	debounceDelay: 2000,
	// This doesn't work with watch… `ignore: [globs.FILES_MARKO_FILES_COMPILED]`
};

function onChange(path, stats) {
	const message = `${path} was updated`;
	notify(message).write(path);
}

function onUnlink(path) {
	const message = `${path} was removed`;
	notify(message).write(path);
}

module.exports = function watchTask(gulp, done, styleTasks, scriptTasks) {
	state.isWatching = true;

	const stylesWatcher = gulp.watch(globs.FILES_SASS, watchOptions, styleTasks);
	stylesWatcher.on('change', onChange);
	stylesWatcher.on('unlink', onUnlink);

	const scriptsWatcher = gulp.watch([globs.FILES_SCRIPTS, `!${globs.FILES_MARKO_FILES_COMPILED}`], watchOptions, scriptTasks);
	scriptsWatcher.on('change', onChange);
	scriptsWatcher.on('unlink', onUnlink);

	done();
};
