// const Koa = require('../lib/application');
const Koa = require('koa');

const app = new Koa();

app.use( async (ctx, next) => {
  
  

  ctx.body= 'hello world';
});

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})
