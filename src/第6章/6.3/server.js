const http = require('http');
const pid = process.pid;
http.createServer((req, res) => {
    res.end(`handled by process.${pid}`);
}).listen(8080, () => {
    console.log(`started process`, pid);
});