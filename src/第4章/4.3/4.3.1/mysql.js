const mysql      = require('mysql2');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'koadb'
});

connection.connect();
const sql = `INSERT INTO tbl_users(username,nickname) VALUES('liujianghong','刘江虹')`; 
connection.query(sql, function (error, results, fields) {
  if (error) throw error;
  console.log('The results is:', results);
});