const Koa = require('koa')
const error = require('koa-error')
const app = new Koa()

const Router = require('koa-router')

const router = new Router()

app.use(error({
  engine: 'pug',
  template: __dirname + '/error.pug'
}));

router.get('/api/getUserInfo', async ( ctx ) => {
  console.log(ctx.request.query)
  if (ctx.request.query.name !== 'liujianghong') {
    throw Error('出现异常') 
  }
  ctx.body = '200: liujianghong'
})

// 加载路由中间件
app.use(router.routes())

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})