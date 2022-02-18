module.exports = class Application extends Emitter {
  
  constructor(options) {
    super();
    // ...
    this.middleware = [];
  }

  use(fn) {
    // 入参必须是函数  
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');

    // 目前版本是2.x，这里主要是兼容1.x版本中的Generator函数
    if (isGeneratorFunction(fn)) {
      deprecate('Support for generators will be removed in v3. ' +
                'See the documentation for examples of how to convert old middleware ' +
                'https://github.com/koajs/koa/blob/master/docs/migration.md');
      // 如果是Generator函数，则将其转成2.x中的(ctx, next) => {}格式          
      fn = convert(fn);
    }
    debug('use %s', fn._name || fn.name || '-');
    this.middleware.push(fn);
    return this;
  }

  callback() {
    // 处理队列中注册的中间件函数
    const fn = compose(this.middleware);

    if (!this.listenerCount('error')) this.on('error', this.onerror);

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };
    // 这里返回一个回调函数，该回调函数对应http模块中的createServer方法中的回调函数参数
    return handleRequest;
  }

};