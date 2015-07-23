var del = require('del');
var consts = require('./consts');

module.exports = function(done) {
  del([consts.DIST_DIR], done);
};
