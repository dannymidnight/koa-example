const views = require('koa-views');

module.exports = views('views', {
  default: 'jade',
  map: {
    html: 'jade'
  }
});
