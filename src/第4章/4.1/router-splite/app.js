const Koa = require('koa')
const registerRouter  = require('./routers')
const app = new Koa()
app.use(registerRouter())
app.listen(4000, () => {
  console.log('server is running, port is 4000')
})