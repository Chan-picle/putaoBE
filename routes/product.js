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
  let sqlSearch = `select * from index_banner,course_list where course_list.t_name = index_banner.t_name and course_list.productId = "${req.body.id}"`;
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
// select * from index_banner,course_list where course_list.t_name = index_banner.t_name and index_banner.t_no= 1
// 通过teacher_id获取数据
router.post("/teachercourse",function(req,res,next){
  // req.body.id
  let sqlSearch = `select * from index_banner,course_list where course_list.t_name = index_banner.t_name and index_banner.t_no = "${req.body.id}"`;
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

//普通外教列表
router.get("/sortList",function(req,res,next){
  let sql = `select *,
  group_concat(productId) as productId1,
  group_concat(title) as title1,
  group_concat(lasting) as lasting1,
  group_concat(time) as time1,
  group_concat(c_price) as c_price1,
  group_concat(c_img) as c_img1,
  sum(bought) as bought1
  from index_banner,course_list,nation_flag where index_banner.t_name = course_list.t_name and index_banner.t_nation = nation_flag.t_nation 
  GROUP BY index_banner.t_name
  ORDER BY t_no`;
  conn.query(sql, (err, results) => {
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
})

//评分外教列表
router.get("/scoreList",function(req,res,next){
  let sql = `select *,
  group_concat(productId) as productId1,
  group_concat(title) as title1,
  group_concat(lasting) as lasting1,
  group_concat(time) as time1,
  group_concat(c_price) as c_price1,
  group_concat(c_img) as c_img1,
  sum(bought) as bought1
  from index_banner,course_list,nation_flag where index_banner.t_name = course_list.t_name and index_banner.t_nation = nation_flag.t_nation 
  GROUP BY index_banner.t_name
  ORDER BY score DESC`;
  conn.query(sql, (err, results) => {
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
})
//销量评分列表
router.get("/soldList",function(req,res,next){
  let sql = `select *,
  group_concat(productId) as productId1,
  group_concat(title) as title1,
  group_concat(lasting) as lasting1,
  group_concat(time) as time1,
  group_concat(c_price) as c_price1,
  group_concat(c_img) as c_img1,
  sum(bought) as bought1
  from index_banner,course_list,nation_flag where index_banner.t_name = course_list.t_name and index_banner.t_nation = nation_flag.t_nation 
  GROUP BY index_banner.t_name
  ORDER BY bought1 DESC`;
  conn.query(sql, (err, results) => {
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
})
module.exports = router;