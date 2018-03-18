/*

This configuration file contains glob patterns to files and folders in the project.

It is possible to use the `cwd` option to set the current working directory for a glob pattern.
E.g. `glob.scync(FILES, {cwd: FOLDER})` or `gulp.watch(FILES, {cwd: FOLDER})`

@see https://en.wikipedia.org/wiki/Glob_(programming)#Syntax
@see http://www.globtester.com/
@see https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulp-api-docs

*/
module.exports = {
	FOLDER_SRC: './dummy/',
	FOLDER_PAGES: './dummy/pages/',
	FOLDER_DIST: './dist/',

	FILE_SERVER_ENTRY: './dummy/index.js',

	// All the output file types.
	FILES_COMPILED: '**/*.{js,css}',

	// Script and Sass source files.
	FILES_SCRIPTS: '**/*.{js,es6,marko}',
	FILES_SASS: '**/*.{sass,scss}',

	// As per Sass convention, files that get imported only have a leading underscore. E.g. `_button.scss`.
	FILES_INLINE: '**/_*.*',

	// Compiled Marko templates.
	FILES_MARKO_FILES_COMPILED: '**/*.marko.js'
}
