const compose = require('koa-compose');

module.exports = class Application extends Emitter {
    
    callback() {
      // 核心实现：处理队列中的中间件
      const fn = compose(this.middleware);
  
      if (!this.listenerCount('error')) this.on('error', this.onerror);
  
      const handleRequest = (req, res) => {
        const ctx = this.createContext(req, res);
        return this.handleRequest(ctx, fn);
      };
  
      return handleRequest;
    }
  
};