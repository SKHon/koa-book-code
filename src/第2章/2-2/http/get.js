const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()

router.get('/api/get/userInfo', async (ctx) => {
  const { name } = ctx.request.query
  ctx.body = `请求参数为：${name}`
})

// 加载路由中间件
app.use(router.routes())

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})