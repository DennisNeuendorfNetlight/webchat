var webpack = require('webpack');
var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

var serverConfig = {
  resolve: {
    root: path.join(__dirname, '/backend'),    
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new LiveReloadPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  context: __dirname,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: path.resolve(__dirname)
  },
  target: 'node',
  entry: path.join(__dirname,'backend','app'),
  externals: checkNodeImport,
  node: {
    global: true,
    __dirname: false,
    __filename: false,
    process: true,
    Buffer: true
  }
}



// Helpers
function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}

module.exports = serverConfig;
