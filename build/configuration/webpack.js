const webpack = require('webpack');
const path = require('path');
const globs = require('./globs');
const state = require('../state');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const uglifyOptions = require('./uglify');

/*
	Webpack 3 configuration.
	⏱ Waiting for Marko Loader to be updated before moving to Webpack 4.

	@see https://github.com/webpack/webpack/tree/v3.11.0/examples
*/
module.exports = {
	entry: require('./entry'),
	output: {
		path: path.resolve(__dirname, '../../', globs.FOLDER_DIST),
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.js', '.json', '.marko', '.es6'],
		modules: [globs.FOLDER_SRC, 'node_modules'],
	},
	watch: state.isWatching,
	performance: {
		get hints() {
			if (state.isDev) return "warning";
			return false;
		}
	},
	stats: {
		colors: true,
		modules: false
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: {
						loader: 'css-loader',
						options: {
							get minimize() {
								if (state.isDev) return false;
								return true;
							}
						}
					},
				}),
			},
			{
				test: /\.(es6|marko)$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.marko$/,
				loader: 'marko-loader',
			},
		],
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),

		new ExtractTextPlugin({ filename: '[name].css' }),

		new webpack.optimize.CommonsChunkPlugin({
			// Combine the vendor code into the site-wide JavaScript file.
			names: ['vendor', 'site'],
			filename: 'site.js',
			minChunks: module => module.context && module.context.includes('node_modules')
		}),

		new UglifyJsPlugin({uglifyOptions: uglifyOptions,})
	],
};
