const log = require('fancy-log');
const path = require('path');
const notify = require("gulp-notify");
const globs = require('../configuration/globs');
const state = require('../state');

const watchOptions = {
	cwd: globs.FOLDER_SRC,
	debounceDelay: 2000,
	// This doesn't work with watch… `ignore: [globs.FILES_MARKO_FILES_COMPILED]`
};

function onChange(event) {
	const message = `${path.basename(event.path)} updated`;
	log(message);
	notify(message).write(event.path);
}

function onUnlink(event) {
	const message = `${path.basename(event.path)} was removed`;
	log(message);
	notify(message).write(event.path);
}

module.exports = function watchTask(gulp, done, styleTasks, scriptTasks) {
	state.isWatching = true;

	gulp
		.watch(globs.FILES_SASS, watchOptions, styleTasks)
		.on('change', onChange)
		.on('unlink', onUnlink);

	gulp
		.watch([globs.FILES_SCRIPTS, `!${globs.FILES_MARKO_FILES_COMPILED}`], watchOptions, scriptTasks)
		.on('change', onChange)
		.on('unlink', onUnlink);

	done();
};
