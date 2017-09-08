const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const env = process.env.WEBPACK_ENV;
const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader')

const buildFolder = 'build';

const appName = 'automaton';

let plugins = [
    new CheckerPlugin(),
    new CleanWebpackPlugin(buildFolder)
], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = appName + '.min.js';
} else {
  outputFile = appName + '.js';
}

let config = {
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
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: plugins
};

module.exports = config;
