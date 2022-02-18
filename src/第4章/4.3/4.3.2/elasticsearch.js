let elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

// 进行连接测试
client.ping({
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

client.create({
  index: 'student2',
  type: '_doc',
  id: '2',
  body: {
    name: 'liujianghong2',
    sex: 'male',
    age: 29
  }
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})