const Koa = require('koa');
const fs = require('fs');
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session');
const Store = require('./store')
const shortid = require('shortid');
const app = new Koa();
const router = new Router()

const redisConfig = {
  redis: {
    port: 6379,
    host: '127.0.0.1',
    password: '',
  },
};


const sessionConfig = {
  // cookie 键名
  key: 'koa:session',
  // 过期时间为一天
  maxAge: 86400000,
  // 不做签名
  signed: false,
  // 提供外部 Store
  store: new Store(redisConfig),
  // key 的生成函数
  genid: () => shortid.generate(),
};

app.use(session(sessionConfig, app));
app.use(bodyParser())
app.use(router.routes())

router.get('/', async ( ctx ) => {
  ctx.set({ 'Content-Type': 'text/html' });
  ctx.body = fs.readFileSync('./index.html');
})

// 当用户登录时，走这里
router.post('/login', async ( ctx ) => {
  const postData = ctx.request.body  // 获取用户的提交数据
  if (ctx.session.usr) {
    ctx.body = `欢迎, ${ctx.session.usr}`;
  } else {
    ctx.session = postData;
    ctx.body = '您第一次登录系统';
  }
})

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})
