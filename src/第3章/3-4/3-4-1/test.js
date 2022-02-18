const Koa = require('koa');
const app = new Koa();

app.use((ctx, next) => {
  // 输出请求中的路径
  console.log(ctx.req.url);
  console.log(ctx.request.req.url);
  console.log(ctx.response.req.url);
  console.log(ctx.url);
  console.log(ctx.request.req.url);

  // 设置状态码和响应内容
  ctx.response.status = 200;
  ctx.body = 'Hello World';
});

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})