const Router = require('koa-router')
const router = new Router()
router.prefix('/user')
router.get('/getInfo', (ctx, next)=>{
    ctx.body = "my name is liujianghong."
})
module.exports = router