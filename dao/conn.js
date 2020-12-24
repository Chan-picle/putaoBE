const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10,
 
  database: 'putaojia',
  port:3306
});

module.exports = pool;
