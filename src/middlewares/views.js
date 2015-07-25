import views from 'koa-views';

export default views('../views', {
  default: 'jade',
  map: {
    html: 'jade'
  }
});
