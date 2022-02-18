const Koa = require('koa')
const app = new Koa()
app.use(async (ctx, next) => {  // 第一个中间件
  console.log('---1--->')
  await next()
  console.log('===6===>')
})
app.use(async (ctx, next) => {  // 第二个中间件
  console.log('---2--->')
  await next()
  console.log('===5===>')
})
app.use(async (ctx, next) => {  // 第三个中间
  console.log('---3--->')
  await next()
  console.log('===4===>')
})

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})
