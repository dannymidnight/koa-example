import koa from 'koa';

let index = koa();

index.use(function *() {
  yield this.render('index', {
    title: 'Hello World'
  });
});

export default index;
