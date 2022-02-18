const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const router = new Router()

app.use(bodyParser())
router.post('/api/get/userInfo', async (ctx) => {
  let { name } = ctx.request.body
  ctx.body = `请求参数为: ${name}`
})

// 加载路由中间件
app.use(router.routes())

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})