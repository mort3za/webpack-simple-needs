const devMode = process.env.NODE_ENV !== "production";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: ["./src/js/main.js"],
  output: {
    path: path.resolve("./dist/"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: require.resolve("jquery"),
        use: [
          {
            loader: "expose-loader",
            options: "jQuery"
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },

      /*
      // postcss only
      {
        test: /\.(css)$/,
        use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 
            'css-loader?url=false', 
            'postcss-loader'
        ]
      }, 
      */

      // sass only
      {
        test: /\.(scss)$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader?url=false",
          // you can enable postcss here to have sass + postcss at the same time
          // 'postcss-loader',
          {
            loader: "sass-loader",
            options: {
              // includePaths: ['./node_modules/bootstrap/...']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ["dist/**/*"] }),
    new MiniCssExtractPlugin({
      filename: "style/" + (devMode ? "[name].css" : "[name].[hash].css"),
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "!!ejs-compiled-loader!./src/index.ejs"
    }),
    new CopyWebpackPlugin([{ from: "src/asset", to: "asset" }], {})
  ]
};
