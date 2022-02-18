const net = require('net');
const pipe = net.Socket({ fd: 1 });
pipe.write('hello master process！');