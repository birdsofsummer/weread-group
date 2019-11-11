var path = require('path');

module.exports = {
  entry:"./src/client/index.js",
  module: {
    rules: [
     { test: /\.json$/, use: 'raw-loader' },
     { test: /\.html$/, use: 'raw-loader',},
    ]
  }
};


