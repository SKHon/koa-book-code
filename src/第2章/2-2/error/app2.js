const Koa = require('koa')
const app = new Koa()

const Router = require('koa-router')

const router = new Router()

router.get('/api/getUserInfo', async ( ctx ) => {
  if (ctx.request.query.name !== 'liujianghong') {
    ctx.body = '400: 用户名不是liujianghong'
    return
  }
  ctx.body = '200: liujianghong'
})

// 加载路由中间件
app.use(router.routes())

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})