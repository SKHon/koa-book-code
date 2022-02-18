const Router = require('koa-router')
const router = new Router()
router.prefix('/goods')
router.get('/getInfo', (ctx, next)=>{
    ctx.body = "this is koa book."
})
module.exports = router