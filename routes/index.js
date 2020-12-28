var express = require('express');
const conn = require('../dao/conn.js');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/hello",function(req,res,next){
  let sqlSearch = `select * from hello`;
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
router.get("/classdetail",function(req,res,next){
  let sqlSearch = `select * from classdetail`;
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
router.get("/timefirst",function(req,res,next){
  let sqlSearch = `select * from time_first`;
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
router.post("/nations",function(req,res,next){
  // req.body.nation
  let sqlSearch = `select * from nation_flag where name="${req.body.nation}"`;
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
router.get("/particulars",(req,res,next)=>{
  let sql = `select * from particulars`;
  conn.query(sql, (err, results) => {
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
})
// 首页外教列表，获取三条信息
router.get("/getindexlist",function(req,res,next){
  let sql =`select * from index_list,nation_flag where index_list.t_nation = nation_flag.t_nation`;
  conn.query(sql, (err, results) => {
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
// 首页banner
router.get("/getbanner",function(req,res,next){
  let sql =`select * from index_banner,nation_flag where index_banner.t_nation = nation_flag.t_nation`;
  conn.query(sql, (err, results) => {
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
})

module.exports = router;
