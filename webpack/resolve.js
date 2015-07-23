var path = require('path');

module.exports = {
  root: path.join(__dirname, '../..'),
  extensions: ['', '.js', '.jsx'],
  modulesDirectories: [
    'assets/js',
    'web_modules',
    'node_modules',
    'bower_components',
    'assets'
  ]
};
