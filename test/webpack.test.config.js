var hostname = 'localhost';
var port = 8000;

module.exports = {
  entry: 'mocha!./test/index.js',
  output: {
    filename: 'test.js',
    path: 'test/',
    publicPath: 'http://' + hostname + ':' + port + '/test'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  },
  devServer: {
    host: hostname,
    port: port
  }
};
