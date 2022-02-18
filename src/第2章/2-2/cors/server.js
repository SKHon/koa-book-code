const Koa = require('koa')
const cors = require('@koa/cors');
const app = new Koa()

const Router = require('koa-router')

const router = new Router()

router.get('/api/getUserInfo', async ( ctx ) => {
  ctx.body = 'liujianghong'
})

// 加载cors中间件
app.use(cors({
    origin: '*'
}));

app.use(router.routes())

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})