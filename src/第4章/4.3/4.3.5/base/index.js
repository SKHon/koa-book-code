/*
在实际项目中，需要记录各种日志，来帮助我们排除错误，或者查看记录。比如BFF框架需要记录一些请求日志：access.log，业务的异常日志：error.log等。
那么如何优雅的去记录这些日志呢，本节主要讲述一个强大的日志模块：log4js。
*/

/*
首先用一个简单的例子来体验log4js的基础能力，代码如下：
*/
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug"; 
logger.debug("Some debug messages");