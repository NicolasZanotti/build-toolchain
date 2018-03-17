const globs = require('./globs');
const glob = require('glob');
const path = require('path');
const log = require('fancy-log');

/*
	Parses the JavaScript entry-points to the application
	and returns them in the format {name: path}.
	E.g. {site: './src/pages/site.js'}
*/
function getPageEntryPoints() {
	const entryPoints = {};

	const name = filePath => path.basename(filePath, path.extname(filePath));
	const hasSameNameAsParentFolder = (name, filePath) => filePath.split(path.sep).includes(name);
	const isPageEntryPoint = (name, filePath) => !hasSameNameAsParentFolder('components', filePath) && hasSameNameAsParentFolder(name, filePath);

	// @see https://github.com/isaacs/node-glob#options
	const globOptions = {
		cwd: globs.FOLDER_PAGES,
		nodir: true,
		ignore: [globs.FILES_INLINE, globs.FILES_MARKO_FILES_COMPILED]
	};

	glob.sync(globs.FILES_SCRIPTS, globOptions).forEach(filePath => {
		let key = name(filePath);
		if (isPageEntryPoint(key, filePath)) {
			entryPoints[key] = globOptions.cwd + filePath;
		}
	});

	return entryPoints;
}

module.exports = getPageEntryPoints();
