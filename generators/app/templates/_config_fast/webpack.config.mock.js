const {resolve} = require('path');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonConfig = require('./webpack.config.common.js');
var webpack = require('webpack');
const { appCfg, buildCfg } = require('./config.js');
const srcPath = resolve(__dirname+'/../', 'src');


const fs = require('fs');

const mockbase = resolve(srcPath, 'mock');


function getMockProxyConf(){
    const conf = {};
    for(var api in appCfg.proxy){
      (function(api){
        conf[api] = {
            bypass: function(req, res, proxyOptions) {
                const apiPattern = new RegExp(`^${api}(.+)$`);
                const match = req.path.match(apiPattern);
                if (!match) {
                    renderPage(req, res);
                    return;
                }
                const filename = match && match[1].replace(/\/$/, '').replace(/\//g, '_') || '';
                const mockfile = resolve(mockbase, filename + '.json');
                let data = {};
                try {
                    data = JSON.parse(fs.readFileSync(mockfile).toString());
                } catch (err) {
                    console.log(err);
                    data = {
                        status_code: 1,
                        msg: 'mock文件不存在或者json解析出错，具体错误请看控制台'
                    };
                }
                res.json(data);
            }
        };
      })(api)
    }
    return conf;
};


module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',

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
    proxy: getMockProxyConf(),
    historyApiFallback: true
  }
});
