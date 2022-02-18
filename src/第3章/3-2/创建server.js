module.exports = class Application extends Emitter {
  
  listen(...args) {
    // debug调试代码，可以先忽略  
    debug('listen');
    // 这里是用的http模块创建server
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }

  callback() {
    const fn = compose(this.middleware);

    if (!this.listenerCount('error')) this.on('error', this.onerror);

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };
    // 这里返回一个回调函数，该回调函数对应http模块中的createServer方法中的回调函数参数
    return handleRequest;
  }

  // 处理request逻辑
  handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }

};

