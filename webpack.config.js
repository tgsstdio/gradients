var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: './app/index.js',
  node: {
    fs: "empty"
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.js$/, enforce: "post", loader: 'ify-loader' },
      { test: /\.(glsl|frag|vert)$/, loader: 'raw', exclude: /node_modules/ },
      { test: /\.(glsl|frag|vert)$/, loader: 'glslify', exclude: /node_modules/ }
    ],

  }  
};