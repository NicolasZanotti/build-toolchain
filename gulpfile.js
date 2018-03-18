const gulp = require('gulp');
const state = require('./build/state');

gulp.task(
	'server',
	done => require('./build/tasks/server')(gulp, done)
);

gulp.task(
	'info',
	done => require('./build/tasks/info')(gulp, done)
);

gulp.task(
	'clean',
	done => require('./build/tasks/clean')(gulp, done)
);

gulp.task(
	'build:scripts',
	done => require('./build/tasks/build-scripts')(gulp, done)
);

gulp.task(
	'build:styles',
	done => require('./build/tasks/build-styles')(gulp, done)
);

gulp.task(
	'default',
	gulp.series(
		gulp.parallel('info', 'clean'),
		gulp.parallel('build:scripts', 'build:styles')
	)
);

gulp.task(
	'watch',
	gulp.series(
		'default',
		'server',
		done => require('./build/tasks/watch')(
			gulp, done, gulp.parallel('build:styles'), gulp.parallel('build:scripts', 'server')
		)
	)
);

process.on('exit', () => {
	if (state.nodeProcess) state.nodeProcess.kill();
});
