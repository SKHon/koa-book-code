const log4js = require('log4js');
log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    app1: { type: 'file', filename: 'application1.log' },
    app2: { type: 'file', filename: 'application2.log' }
  },
  categories: {
    default: { appenders: [ 'out' ], level: 'trace' },
    app1: { appenders: ['app1'], level: 'trace' },
    app2: { appenders: ['app2'], level: 'info' }
  }
});

const logger = log4js.getLogger();
logger.trace('This will use the default category and go to stdout');

const app1Log = log4js.getLogger('app1');
app1Log.trace('This will go to a file');

const app2Log = log4js.getLogger('app2');
app2Log.info('This will go to a file');