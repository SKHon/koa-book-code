
module.exports = compose

function compose (middleware) {

  // 入参必须是数组
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  // 数组中的每一项，必须是函数[其实就是注册的中间件回调函数：(ctx. next) => {}]
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  // 返回闭包，由此可知在 koa this.callback 中的 fn 后续一定会使用这个闭包传入过滤后的 context
  return function (context, next) {
    // last called middleware #
    // 初始化中间件函数数组执行的下标值
    let index = -1
    // 返回递归执行的 Promise.resolve 去执行整个中间件数组，初始从第一个开始
    return dispatch(0)
    function dispatch (i) {
      // 校验上次执行的下标 index 不能大于本次执行的传入下标 i，如果大于可能是 next(下个中间件) 执行了多次导致
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))

      index = i

      // 拿到当前的中间件函数
      let fn = middleware[i]

      // 如果当前执行下标等于中间件长度，那已经执行结束了，返回Promise.resolve()即可
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()

      try {
        // 这里用了递归，执行每个中间件
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}