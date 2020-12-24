const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: '42.192.148.152',
  user: 'putaojia',
  password: '123456',
  database: 'putaojia',
  port:3306
});

module.exports = pool;