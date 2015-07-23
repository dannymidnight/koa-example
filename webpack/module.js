module.exports = {
  loaders: [
    { test: /\.jsx?$/, loaders: ['babel-loader'], exclude: /node_modules|bower_components/ }
  ]
};
