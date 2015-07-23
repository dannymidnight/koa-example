module.exports = {
  loaders: [
    { test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules|bower_components/ }
  ]
};
