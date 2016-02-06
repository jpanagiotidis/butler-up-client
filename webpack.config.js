var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var sassPaths = require("node-refills").includePaths.map(function(sassPath) {
  return "includePaths[]=" + sassPath;
}).join("&");

module.exports = {
  devtool: 'eval-source-map',
  entry: __dirname + "/source/js/app.js",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js",
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.js$/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass?" + sassPaths
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin("Buttler Up"),
    new HtmlWebpackPlugin({
      template: __dirname + '/source/html/index.tmpl.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "./build",
    port: 3910,
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true
  }
}