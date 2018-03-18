const gulp = require('gulp');
const state = require('./build/state');

gulp
	.task(
		'default',
		['info', 'clean', 'build:scripts', 'build:styles']
	)
	.task(
		'server',
		done => require('./build/tasks/server')(gulp, done)
	)
	.task(
		'info',
		done => require('./build/tasks/info')(gulp, done)
	)
	.task(
		'clean',
		done => require('./build/tasks/clean')(gulp, done)
	)
	.task(
		'build:scripts',
		['clean'],
		done => require('./build/tasks/build-scripts')(gulp, done)
	)
	.task(
		'build:styles',
		['clean'],
		done => require('./build/tasks/build-styles')(gulp, done)
	)
	.task(
		'watch',
		['clean', 'build:scripts', 'build:styles', 'server'],
		done => require('./build/tasks/watch')(gulp, done, ['build:styles'], ['build:scripts', 'server'])
	);

process.on('exit', () => {
	if (state.nodeProcess) state.nodeProcess.kill();
});
