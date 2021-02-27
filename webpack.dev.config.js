const path = require('path');

// Clean dist folder - hash files
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Generate html files
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point
  entry: {
    // Set order as you want them to appear in script tags.
    ui: './src/ui.js',
    app: './src/app.js',
  },
  output: {
    // [name] - name of the js file in entry point i.e. app and ui in this case
    filename: '[name].bundle.js',

    // path.resolve outputs absolute path
    // __dirname - outputs absolute file path of current directory
    path: path.resolve(__dirname, 'dist'),
  },

  // 'development' for the development build.
  mode: 'development',

  // live server triggers on save
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),

    // set to false(default) if you want no files to be created after dev build process and not running nodejs. Webpack keeps it in memory.
    writeToDisk: true,
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        // File loader - images
        test: /\.(png|jpg)$/,
        use: 'file-loader',
      },
      {
        // CSS loader
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // SASS loader - scss, sass files. Order is VERY important. Webpack processes loader from right to left. 'sass-loader' first then 'css-loader' then ...
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        // Babel loader - '@babel/env' compiles ECMA 6,7,8,9,10 to ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: [
              'transform-class-properties',
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
      {
        // HTML integration with handlebars
        test: /\.hbs$/,
        use: ['handlebars-loader'],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: './index.html',

      // chunks: ['app'] - entry.app
      chunks: ['ui', 'app'],
      template: './src/index.hbs',

      //  <title>{{htmlWebpackPlugin.options.title}}</title> in html for 'Production' to show up in title after build process
      title: 'Production',
    }),
  ],
};
