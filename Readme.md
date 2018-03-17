# Build Toolchain

[Gulp](https://gulpjs.com/) tasks for a streamlined development workflow with [Webpack](https://webpack.js.org/), [Marko](https://markojs.com/), [Babel](https://babeljs.io/) and [Sass](https://sass-lang.com/).

Run `npm install` and `npm run build` then open `index.html` in your browser.

## Features

0. Parsing of file entry points based on their name. Like the Sass convention, files with a preceding underscore are skipped unless they get required.
0. Transpilation of files ending in `es6` and `marko` from EcamaScript 6 to EcamaScript 5.
0. Compression of all JavaScripts using UglifyJs.

## Development

The Gulp tasks default to production mode. In order to enable development features, pass 'development' as the Node environment:

	NODE_ENV=development gulp

## Commands

By default, Gulp will build all assets and then exit.

**watch** – starts watching the source folder for changes and compiles on the fly.

**info** – outputs the state of the build tools. E.g. the environment it's running in.

**build:scripts** – builds all JavaScripts.

**build:styles** – builds all stylesheets.

**clean** – removes all files from the distribution folder.

## Todo

* Dynamically search for entry-points.
* Refresh Node when watching for file changes.
* Pass in default Sass format to (not scss) Sass compiler.
* Optionally create source-maps during development.
* Update to Webpack 4 once [marko-loader](https://github.com/marko-js/marko-loader/releases) has been updated.
* Move Sass handling into Webpack once there is a Sass loader that supports [Dart Sass](https://github.com/sass/dart-sass).
* Enable [Sass in Marko templates](https://markojs.com/docs/webpack/#using-css-pre-processors) once the Sass loader is available.
