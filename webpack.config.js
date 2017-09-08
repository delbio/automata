var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
var env = process.env.WEBPACK_ENV;
var path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader')

var buildFolder = 'build';

var appName = 'automaton';

var plugins = [
    new CheckerPlugin(),
    new CleanWebpackPlugin(buildFolder)
], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = appName + '.min.js';
} else {
  outputFile = appName + '.js';
}

var config = {
  entry: __dirname + '/src/index.ts',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, buildFolder),
    filename: outputFile,
    library: 'Automata',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        include: /src/
      },
    ]
  },
  resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      "modules": [
        "./node_modules",
        "./node_modules"
      ],
      "symlinks": true
  },
  "resolveLoader": {
    "modules": [
      "./node_modules",
      "./node_modules"
    ]
  },
  plugins: plugins
};

module.exports = config;
