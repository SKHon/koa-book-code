var delegate = require('delegates');

var obj = {};
obj.request = {
    name: 'liujianghong',
    age: 29,
    sex: 'man',
    say: function(){
        console.log('hello koa!');
    }
};
// 将 obj.request 的相关属性委托到 obj 上，使调用更加简便
delegate(obj, 'request')
    .method('say')
    .getter('name')
    .setter('nickname')
    .access('age');

obj.say(); 
obj.nickname = 'SKHon';
console.log('nickname: ', obj.request.nickname)
console.log('现在年龄: ',obj.age)
obj.age = 30;
console.log('明年年龄: ',obj.age)

