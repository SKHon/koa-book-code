const compose = require('koa-compose')
const glob = require('glob')
const { resolve } = require('path')

registerRouter = () => {
    let routers = [];
    // 递归式获取当前文件夹下所有的js文件
    glob.sync(resolve(__dirname, './', '**/*.js'))
        // 排除index.js文件，因为这个文件不是具体的路由文件
        .filter(value => (value.indexOf('index.js') === -1)) 
        .forEach(router => {
            routers.push(require(router).routes())
            routers.push(require(router).allowedMethods())
        })
    return compose(routers)
}

module.exports = registerRouter