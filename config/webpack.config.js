const path = require('path')
const NodemonPlugin = require( 'nodemon-webpack-plugin' )

const config = {
	entry: path.join(__dirname, '../', 'asset/js/index.js'),
	output: {
		path: path.join(__dirname, '../', 'public/js/'),
		filename: 'bundle.js',
  },
  devtool: 'source-map',
  mode: "development",
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: [ "@babel/preset-env" ]
				}
      },
      // {
			// 	test: /\.scss$/,
			// 	loader: 'scss-loader'
      // },
		]
  },
  plugins: [
    new NodemonPlugin(),
  ],
};
module.exports = config;
