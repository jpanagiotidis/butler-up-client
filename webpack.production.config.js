var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var sassPaths = require("node-refills").includePaths.map(function(sassPath) {
  return "includePaths[]=" + sassPath;
}).join("&");

module.exports = {
  entry: __dirname + "/source/js/app.js",
  output: {
    path: __dirname + "/build",
    filename: "[name]-[hash].js"
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
        loader: ExtractTextPlugin.extract("style", "css!sass?" + sassPaths)
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin("Buttler Up"),
    new HtmlWebpackPlugin({
      template: __dirname + '/source/html/index.tmpl.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("[name]-[hash].css")
  ]
}