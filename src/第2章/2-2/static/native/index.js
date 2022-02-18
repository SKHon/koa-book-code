const Koa = require('koa')
const fs = require('fs')
const path = require('path')

// 设置一个mime map，因为本项目只设计三种类型的，所以这里只列三种
const MIMES_MAP = {
  'css': 'text/css',
  'html': 'text/html',
  'jpg': 'image/jpeg'
}

const app = new Koa()

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

// 解析资源类型
function parseMime( url ) {
  let extName = path.extname( url )
  extName = extName ? extName.slice(1) : 'unknown'
  return  MIMES_MAP[extName]
}

app.use( async ( ctx ) => {
  // 静态资源目录在本地的绝对路径
  let fullStaticPath = path.join(__dirname, staticPath)

  // 获取静态资源内容，有可能是文件内容，目录，或404
  let content = fs.readFileSync(path.join(fullStaticPath, ctx.url), 'binary' )

  // 解析请求内容的类型
  let mime = parseMime(ctx.url)

  // 如果有对应的文件类型，就配置上下文的类型
  if (mime) {
    ctx.type = mime
  }

  // 输出静态资源内容
  if ( mime && mime.indexOf('image/') >= 0 ) {
    // 如果是图片，则用node原生res，输出二进制数据
    ctx.res.writeHead(200)
    ctx.res.write(content, 'binary')
    ctx.res.end()
  } else {
    // 其他则输出文本
    ctx.body = content
  }
})

app.listen(4000, () => {
  console.log('server is running, port is 4000')
})


