var _ = require('underscore');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var _params = getParams();
console.log(_params);

var webpackConfig = {
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
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin("Buttler Up")
  ]
}

if(_params.mode === 'dev'){
  webpackConfig.devtool = 'eval-source-map';
  webpackConfig.devServer = {
    contentBase: "./build",
    port: 3910,
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true
  }

  webpackConfig.module.loaders.push({
    test: /\.scss$/,
    loader: "style!css!sass?" + getSassPaths()
  });

  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    template: __dirname + '/source/html/index.tmpl.html'
  }));
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  webpackConfig.plugins.push(new CopyWebpackPlugin([
    {
      from: __dirname + '/source/images',
      to: __dirname + '/images'
    }
  ]));

}else if(_params.mode === 'prod'){
  webpackConfig.module.loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract("style", "css!sass?" + getSassPaths())
  });

  webpackConfig.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
  webpackConfig.plugins.push(new CopyWebpackPlugin([
    {
      from: __dirname + '/source/images',
      to: __dirname + '/images'
    }
  ]));

  if(_params.platform === 'web'){
    webpackConfig.output.filename = "[name]-[hash].js";
    webpackConfig.plugins.push(new HtmlWebpackPlugin({
      template: __dirname + '/source/html/index.tmpl.html'
    }));
    webpackConfig.plugins.push(new ExtractTextPlugin("[name]-[hash].css"));

  }else if(_params.platform === 'android'){
    webpackConfig.output.path = __dirname + "/cordova/www";
    webpackConfig.output.filename = "bundle.js";
    webpackConfig.plugins.push(new ExtractTextPlugin("bundle.css"));

  }
}

module.exports = webpackConfig;

function getParams(){
  var out = {
    mode: 'dev',
    platform: 'web'
  };

  _.each(process.argv, function(arg){
    if(arg.indexOf('--#mode') === 0){
      var newVal = getParamValue(arg);
      if(newVal){
        out.mode = newVal;
      }
    }

    if(arg.indexOf('--#platform') === 0){
      var newVal = getParamValue(arg);
      if(newVal){
        out.platform = newVal;
      }
    }
  });

  return out;
}

function getParamValue(s){
  var out = s.split('=');
  if(out.length > 1){
    return out[1];
  }else{
    return undefined;
  }
}

function getSassPaths(){
  return require("node-refills").includePaths.map(function(sassPath) {
    return "includePaths[]=" + sassPath;
  }).join("&");
}