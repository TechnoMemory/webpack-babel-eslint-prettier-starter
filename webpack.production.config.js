const path = require('path');

// Extracting css into separate bundle
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    ui: './src/ui.js',
    app: './src/app.js',
  },
  output: {
    // Browser Caching - [contenthash] creates MD5 hash file
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },

  // 'production' for the production build.
  mode: 'production',

  // Extracting common dependencies - optimization.splitChunks can extract common dependencies into its own bundle. Reduces size of app.js and ui.js and creates third bundle.
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor',

      // Custom option for code splitting with dependencies less than 30kb.
      minSize: 10000,
      automaticNameDelimiter: '_',
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: 'file-loader',
      },
      {
        // MiniCssExtractPlugin.loader extracts css into separate bundle replacing style-loader with MiniCssExtractPlugin.loader.
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['transform-class-properties'],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),

    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: './index.html',

      // Extracting common dependencies -  'vendor' bundle/chunk created from optimization property in module.exports
      chunks: ['app', 'ui', 'vendors~app~ui'],
      template: './src/index.hbs',
      title: 'Production',
    }),
  ],
};
