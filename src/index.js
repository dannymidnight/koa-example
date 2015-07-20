const koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const app = koa();
const port = 3000;

app.use(serve(path.resolve(__dirname, '../dist')));
app.use(require('./views'));
app.use(require('./assets'));

app.use(function *() {
  yield this.render('index', {
    title: 'Hello World'
  });
});

app.listen(port, () => {
  console.log(`* Running on 0.0.0.0:${port}`);
});
