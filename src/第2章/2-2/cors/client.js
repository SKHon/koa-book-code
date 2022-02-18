const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const app = new Koa()

const staticPath = './static'

app.use(static(
  path.join( __dirname,  staticPath)
))

app.listen(3000, () => {
  console.log('server is running, port is 3000')
})

