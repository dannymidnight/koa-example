var path = require('path');
var root = path.join(__dirname, '../');

module.exports = {
  ROOT_DIR: root,

  // Production build of assets
  PRODUCTION: process.env.NODE_ENV === 'production',

  // Non-compiled assets directory.
  ASSETS_DIR: path.join(root, 'static'),

  // Public assets directory where they're referenced from the app.
  DIST_DIR: path.join(root, 'dist'),

  // Bower components directory.
  BOWER_DIR: path.join(root, 'bower_components')
};
