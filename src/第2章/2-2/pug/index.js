const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
  extension: 'pug' 
}))

app.use( async ( ctx ) => {
  let title = 'koa'
  await ctx.render('index', {
    title,
  })
})

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})
