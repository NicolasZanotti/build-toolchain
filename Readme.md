# Build Toolchain

[Gulp](https://gulpjs.com/) tasks for a streamlined development workflow with [Webpack](https://webpack.js.org/), [Marko](https://markojs.com/), [Babel](https://babeljs.io/) and [Sass](https://sass-lang.com/).

Run `npm install` and `npm run build`.

This repo also includes a `dummy` folder with some examples for compilation.

## Features

* Compiling Marko templates.
* Compiling Sass stylesheets.
* Transpiling ES6 code.
* Watching for file changes and recompiling.
* Running and refreshing the Node server during development.
* Parsing of Webpack entry points based on their filename ❧.
* Minification of assets for production.


❧ like the Sass convention, files with a preceding underscore '_*.*' are skipped unless they get required

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

* Pass in default Sass format to (not scss) Sass compiler.
* Update to Gulp 4
* Watch for Git changes and reboot.
* Optionally create source-maps during development.
* Update to Webpack 4 once [marko-loader](https://github.com/marko-js/marko-loader/releases) has been updated.
* Move Sass handling into Webpack once there is a Sass loader that supports [Dart Sass](https://github.com/sass/dart-sass).
* Enable [Sass in Marko templates](https://markojs.com/docs/webpack/#using-css-pre-processors) once the Sass loader is available.
