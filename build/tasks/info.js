const state = require('../state');
const log = require('fancy-log');
const wrap = require('ansi-wrap');

module.exports = function infoTask(gulp, done) {
	log(
		wrap(32, 39, state.toString())
	);
	done();
};
