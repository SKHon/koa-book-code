const { spawn } = require('child_process');
const child = spawn('node', ['child'], {
  // 子进程的标准输入输出配置
  stdio: [null, null, null, 'pipe'],
});
child.stdio[1].on('data', data => {
  console.log(`来自子进程消息 ${data.toString()}`);
});