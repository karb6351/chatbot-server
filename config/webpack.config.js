const path = require('path')
const NodemonPlugin = require( 'nodemon-webpack-plugin' )
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = {
	entry: path.join(__dirname, '../', 'resources/asset/js/index.js'),
	output: {
		path: path.join(__dirname, '../', 'public/js/'),
		filename: 'bundle.js',
		globalObject: 'this'
	},
  devtool: 'source-map',
  mode: "development",
	module: {
		rules: [
			{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: [ "@babel/preset-env" ]
				}
			},
			
			// {
			// 	test: /\.scss$/,
			// 	use: [
			// 			"style-loader", // creates style nodes from JS strings
			// 			"css-loader", // translates CSS into CommonJS
			// 			"sass-loader" // compiles Sass to CSS, using Node Sass by default
			// 	]
			// }
		]
  },
  plugins: [
		new NodemonPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new VueLoaderPlugin()
  ],
};
module.exports = config;
