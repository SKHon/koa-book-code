process.on('message', (msg) => {
  console.log('子进程收到主进程的消息：', msg);
});

// 给主进程发消息
process.send('hello master process!');