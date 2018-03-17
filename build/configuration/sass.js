const state = require('../state');

/*
	Dart Sass configuration
	@see https://github.com/sass/dart-sass#javascript-api
*/
module.exports =  {
	options: {
		get outputStyle() {
			if (state.isDev) {
				return 'expanded';
			}
			return 'compressed'
		}
	},
	variables: {
		color: 'red'
	}
}
