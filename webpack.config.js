const devMode = process.env.NODE_ENV !== 'production';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IconFontPlugin = require('icon-font-loader').Plugin;

module.exports = {
  entry: ['./src/js/main.js'],
  output: {
    path: path.resolve('./dist/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(scss)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          // {
          //   loader: 'style-loader' // inject CSS to page
          // },
          {
            loader: 'css-loader?url=false' // translates CSS into CommonJS modules
          },
          {
            loader: 'icon-font-loader'
          },
          // 'postcss-loader',
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: {
              includePaths: ['./node_modules/bootstrap-sass/assets/stylesheets']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new IconFontPlugin({
      output: 'style/fk-font',
      fontName: 'fkFont',
      mergeDuplicates: devMode
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'style/' + (devMode ? '[name].css' : '[name].[hash].css'),
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '!!ejs-compiled-loader!./src/index.ejs'
    }),
    new CopyWebpackPlugin([{ from: 'src/asset', to: 'asset' }], {})
  ]
};
