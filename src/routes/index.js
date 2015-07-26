import koa from 'koa';

let index = koa();

index.use(function *() {
  this.body = this.react('Homepage', {
    title: 'Hello world',
    styles: ['css/index.css'],
    scripts: ['js/index.js']
  });
});

export default index;
