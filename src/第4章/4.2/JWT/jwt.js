const { sign, decode } = require('jsonwebtoken');

const secret = 'my_secret';

console.log(sign({ username: 'liujianghong' }, secret, { expiresIn: '1h' }));
// console.log(HMACSHA256('tCZobphzBo0atE5cXLVI-9NxE-PUbs9dY1gPSrty5pw', 'my_secret'))

console.log(decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxpdWppYW5naG9uZyIsImlhdCI6MTYzMDc0MDQwNiwiZXhwIjoxNjMwNzQ0MDA2fQ.CVixuoOdPsZciLy1w7hz5QhODU51T66aOqB1YFo5jcU', { complete: true }))
// console.log(encodeURIComponent('eyJ1c2VybmFtZSI6ImxpdWppYW5naG9uZyIsImlhdCI6MTYzMDcyNTU0NiwiZXhwIjoxNjMwNzI5MTQ2fQ'))
