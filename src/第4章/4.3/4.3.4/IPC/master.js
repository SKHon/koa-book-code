const cp = require('child_process');
const n = cp.fork(`child.js`);

n.on('message', (msg) => {
  console.log('主进程收到子进程的消息: ', msg);
});

// 主进程发送给子进程的消息
n.send('hello child process！');