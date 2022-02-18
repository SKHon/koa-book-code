const log4js = require("log4js");
const logger = log4js.getLogger();

// all level
logger.level = "all"; 
logger.all("Some all messages");

// trace level
logger.level = "trace"; 
logger.trace("Some trace messages");

// debug level
logger.level = "debug"; 
logger.debug("Some debug messages");

// info level
logger.level = "info"; 
logger.info("Some info messages");

// warn level
logger.level = "warn"; 
logger.warn("Some warn messages");

// error level
logger.level = "error"; 
logger.error("Some error messages");

// fatal level
logger.level = "fatal"; 
logger.fatal("Some fatal messages");

// mark level
logger.level = "mark"; 
logger.mark("Some mark messages");

// off level
logger.level = "off"; 
logger.off("Some off messages");