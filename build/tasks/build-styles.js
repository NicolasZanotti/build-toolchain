const through = require('through2');
const sass = require('sass');
const path = require('path');
const flatten = require('gulp-flatten');
const config = require('../configuration/sass');
const globs = require('../configuration/globs');
const log = require('fancy-log');

/*


	⏱ Waiting for Dart Sass to be better integrated with Webpack before moving it in there.


*/

function replaceFileExtension(filePath, extension) {
	if (typeof filePath !== 'string') return filePath;
	if (filePath.length === 0) return filePath;

	let fileName = path.basename(filePath, path.extname(filePath)) + extension;
	let replaced = path.join(path.dirname(filePath), fileName);

	return replaced;
}

let sassVariablesToString = function(sassVariables) {
	if (!sassVariables) return '';

	let str = '';
	for (let variable in sassVariables) {
		if (sassVariables.hasOwnProperty(variable)) {
			str += ('$' + variable) + ': ' + JSON.stringify(sassVariables[variable]) + ';\n';
		}
	}

	return str;
};

function sassify(options, variables) {
	return through.obj(function(file, enc, cb) {
		if (file.isNull()) return cb(null, file);
		if (file.isStream()) return cb(new Error('Streaming not supported'));
		if (path.basename(file.path).indexOf('_') === 0) return cb();
		if (!file.contents.length) {
			file.path = replaceFileExtension(file.path, '.css');
			return cb(null, file);
		}

		let opts = Object.assign({}, options);
		opts.data = sassVariablesToString(variables) + file.contents.toString();

		sass.render(opts, (error, obj) => {
			if (error) {
				return cb(new Error(error));
			}
			file.contents = obj.css;
			file.path = replaceFileExtension(file.path, '.css');

			cb(null, file);
		});
	});
}

module.exports = function buildStylesTask(gulp, done) {
	return gulp
		.src(globs.FILES_SASS, {cwd: globs.FOLDER_SRC})
		.pipe(sassify(config.options, config.variables))
		.on('error', error => {
			log.error(error);
			done();
		})
		.pipe(flatten())
		.pipe(gulp.dest(globs.FOLDER_DIST));
}
