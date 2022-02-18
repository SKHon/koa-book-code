const Koa = require('koa')
const rewrite = require('koa-rewrite')
const app = new Koa()

const Router = require('koa-router')

const router = new Router()

router.get('/api/new/getUserInfo', async ( ctx ) => {
  ctx.body = '这是新接口数据！'
})

app.use(rewrite('/api/getUserInfo', '/api/new/getUserInfo'));
app.use(router.routes())

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})