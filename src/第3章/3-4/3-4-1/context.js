module.exports = class Application extends Emitter {
  
  constructor(options) {
    super();
    // ...

    // 三个属性，通过Ojbect.create()方法分别继承context，request，response
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  callback() {
    const fn = compose(this.middleware);

    if (!this.listenerCount('error')) this.on('error', this.onerror);

    const handleRequest = (req, res) => {
      // 这里创建了ctx对象  
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }

  createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);

    // 将实例挂载到 context.app 中
    context.app = request.app = response.app = this;

    // 将 request 事件的http.IncomingMessage 类挂载到 context.req 中
    context.req = request.req = response.req = req;

    // 将 request 事件的http.ServerResponse 类挂载到 context.res 中
    context.res = request.res = response.res = res;

    // 互相挂载，方便用户可以在 koa 中通过 ctx 就可以拿到所有需要的东西
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};
    return context;
  }

};

