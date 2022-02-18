const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  const url = ctx.request.url
  let content = ''
  switch (url) {
    case '/api/get/userInfo':
      content = '200: this is getUserInfo request'
      break;
    case '/api/update/userInfo':
      content = '200: this is updateUserInfo request'
      break;
    default:
      content = '404: no router match'
      break;
  }
  ctx.body = content
})
app.listen(4000);
console.log('[demo] start-quick is starting at port 4000');