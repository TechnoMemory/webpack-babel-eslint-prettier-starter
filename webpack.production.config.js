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

  // Extracting common dependencies - optimization.splitChunks can extract common dependencies into its own bundle. Reduces size of app.js and ui.js and creates third bundle 'vendor' will be cached separately and users don't need to download when we change something in app.js and ui.js.
  optimization: {
    splitChunks: {
      chunks: 'all',

      // Custom option for code splitting - By default wp extract common dependency only when they exceed 30kb before minification. It won't work with dependencies less than 30kb. In order to extract these to separate bundle. Specify custom config options for splitting chunks.
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
