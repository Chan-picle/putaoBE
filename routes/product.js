var express = require('express');
const conn = require('../dao/conn.js');

var router = express.Router();
// 获取产品列表
router.get("/productlist",function(req,res,next){
  let sqlSearch = `select * from course_list`;
  conn.query(sqlSearch, (err, results) => {
      let obj = {
        status:1
      }
      if (err) {
        obj.msg = "失败"
        throw err
      }else{
        obj.status=0;
        obj.result = results;
      }
      res.json(obj);
  })
});
// 通过产品id获取数据
router.post("/getproduct",function(req,res,next){
  // req.body.id
  let sqlSearch = `select * from course_list where productId ="${req.body.id}"`;
  conn.query(sqlSearch, (err, results) => {
    let obj = {
      status:1,
    }
    if (err) {
      obj.msg = "失败"
      throw err
    }else{
      obj.status = 0;
      obj.result = results;
    }
    res.json(obj);
  })
});

module.exports = router;