const state = require('../state');

/*
	UglifyJs configuration
	@see https://github.com/webpack-contrib/uglifyjs-webpack-plugin#uglifyoptions
*/
module.exports = {
	get compress() {
		if (state.isDev) return false;
		return true;
	},
	mangle: false,
	output: {
		get beautify() {
			if (state.isDev) return true;
			return false;
		}
	},
}
