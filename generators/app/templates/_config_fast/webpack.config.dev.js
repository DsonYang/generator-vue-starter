const {resolve} = require('path');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonConfig = require('./webpack.config.common.js');
var webpack = require('webpack');
const {appCfg , buildCfg } = require('./config.js');
const srcPath = resolve(__dirname+'/../', 'src');


module.exports = webpackMerge(commonConfig, {
  devtool: '#source-map',

  output: {
    path: resolve(__dirname, buildCfg.outputPath),
    filename: '[name].js',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: "/"
  },
  plugins: [
    new webpack.DefinePlugin({
      DEBUG: true,
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new ExtractTextPlugin('[name].css'),

    new HtmlWebpackPlugin({
        template: resolve(srcPath, `index.html`),
        inject: true,
        chunks: ['vendor', 'main'],
        filename: resolve(__dirname, buildCfg.outputPath, `index.html`)
    })
  ],
  devServer: {
    port: 8010,
    inline: true,
    stats: 'minimal',
    proxy:  (function(){
      var o = {};
      for(var api in appCfg.proxy){
        o[api] = {
          target: appCfg.proxy[api],
          changeOrigin: true
        }
      }
      return o;
    }()),
    historyApiFallback: true
  }
});
