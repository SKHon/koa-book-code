const addon = require('./build/Release/sum')
console.log(addon.sum(1,2))
module.exports = addon.sum