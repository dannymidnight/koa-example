import koa from 'koa';
import mount from 'koa-mount';
import serve from 'koa-static';
import path from 'path';
import index from './routes/index';

const app = koa();
const port = process.env.PORT || 5000;

app.use(require('./middlewares/errors'));
app.use(require('./middlewares/views'));
app.use(require('./middlewares/assets'));
app.use(require('./middlewares/react'));
app.use(serve(path.resolve(__dirname, '../dist')));

app.use(mount('/', index));

app.listen(port, () => {
  console.log(`* Running on 0.0.0.0:${port}`);
});
