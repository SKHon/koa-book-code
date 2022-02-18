const glob = require('glob')
const path = require('path')
const Koa = require('koa')
const app = new Koa()

// actions的绝对路径
const basePath = path.resolve(__dirname, './actions')
// 获取actions目录下所有的js文件，并返回其绝对路径
const filesList = glob.sync(path.resolve(__dirname, './actions', '**/*.js'))

// 文件路由映射表
let routerMap = {}
filesList.forEach(item => {
  // 解构的方式获取，当前文件导出对象中的method属性和handler属性
  const { method, handler } = require(item)
  // 获取和actions目录的相对路径，例如：goods/getInfo.js
  const relative = path.relative(basePath, item)
  // 获取文件后缀.js
  const extname = path.extname(item)
  // 剔除后缀.js,并在前面加一个"/",例如：/goods/getInfo
  const fileRouter = '/' + relative.split(extname)[0]
  // 连接method，形成一个唯一请求，例如: _GET_/goods/getInfo
  const key = '_' + method + '_' + fileRouter
  // 保存在路由表里
  routerMap[key] = handler
})

app.use(async (ctx, next) => {
  const { path, method } = ctx
  // 构建和文件路由匹配的形式：_GET_路由
  const key = '_' + method + '_' + path
  // 如果匹配到，就执行对应到handler
  if (routerMap[key]) {
    routerMap[key](ctx)
  } else {
    ctx.body = 'no this router'
  }
})

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})