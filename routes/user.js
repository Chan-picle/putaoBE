const express = require('express');
const conn = require('../dao/conn.js');

const router = express.Router();

router.get('/getuser', function(req, res, next) {
  let sqlSearch = `select * from user`;
  conn.query(sqlSearch, (err, results) => {
      if (err) throw err;
      res.json(results);
  })
});
router.post('/login', function(req, res, next) {
  //电话号码正则判断
  let sqlSearch = `select * from user where user_phone=${req.body.phone}`;
  conn.query(sqlSearch, (err, results) => {
      if (err) throw err;
      // res.json(results);
      console.log(results);
  })
});
module.exports = router;



// let insertSql = `insert into user (user_name,user_password,user_phone) 
//     values ('chen123','123','8888888888')`;
// conn.query(insertSql, (err, results) => { //results是结果数组
//   if (err) throw err;
//   console.log(results)
// })
