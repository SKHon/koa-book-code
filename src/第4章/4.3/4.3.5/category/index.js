const log4js = require('log4js');
log4js.configure({
  appenders: {
    out: { type: 'stdout' }
  },
  categories: {
    default: { appenders: [ 'out' ], level: 'trace' }
  }
});

const logger = log4js.getLogger();
logger.trace('This will use the default category and go to stdout');

const app1Log = log4js.getLogger('app1');
app1Log.trace('This will go to a file');

const app2Log = log4js.getLogger('app2');
app2Log.trace('This will go to a file');
