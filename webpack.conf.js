var path = require('path');
var glob = require('glob');
var consts = require('./gulp/consts');

var INPUT_JS_DIR = path.join(consts.ASSETS_DIR, 'js');
var OUTPUT_JS_DIR = path.join(consts.DIST_DIR, 'js');

function entryPoints () {
  var entries = {};
  glob('*(*.jsx|*.js)', { cwd: INPUT_JS_DIR, sync: true }).forEach(function (file) {
    entries[file.replace(/\.jsx|\.js/, '')] = [
      path.join(INPUT_JS_DIR, file)
    ];
  });
  return entries;
}

module.exports = {
  resolve: require('./webpack/resolve.js'),
  module: require('./webpack/module.js'),
  plugins: require('./webpack/plugins.js'),
  entry: entryPoints(),
  output: {
    path: OUTPUT_JS_DIR,
    filename: '[name].js',
    chunkFileName: '[id].chunk.js',
    publicPath: '/static/js/'
  }
};
