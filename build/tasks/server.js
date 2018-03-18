const {spawn} = require('child_process');
const globs = require('../configuration/globs');
const log = require('fancy-log');
const state = require('../state');

/*
	Poor man's browser refresh inspired by https://gist.github.com/webdesserts/5632955
*/
module.exports = function serverTask(gulp, done) {
	if (state.nodeProcess) {
		log('Server task killing node process');
		state.nodeProcess.kill();
	}

	state.nodeProcess = spawn('node', [globs.FILE_SERVER_ENTRY], {stdio: 'inherit'});
	state.nodeProcess.on('close', code => {
		if (code === 8) log('Node process closed')
	});

	done();
};
