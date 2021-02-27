const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  entry: {
    server: './src/server.js',
  },
  output: {
    filename: 'server.bundle.js',
    path: path.resolve('./dist'),
  },
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],

  plugins: [new NodemonPlugin()],
};
