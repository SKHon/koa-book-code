const Koa = require('koa');
const app = new Koa();

app.use( async ( ctx ) => {
  ctx.body = 'hello world'
});

app.listen(4000);
console.log('[demo] start-quick is starting at port 4000');