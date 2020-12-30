const express = require('express');
const conn = require('../dao/conn.js');
const axios = require("axios");

const router = express.Router();

//获取所有用户信息
router.get("/getuser",function(req,res,next){
  let sqlSearch = `select * from user`;
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

//发送短信验证码
router.post('/sendcode', function(req, res, next) {
  let revalue={status:1};
  //使用别的接口发送短信
  axios.post("http://www.pudge.wang:3180/register/getCode",
  {
    phone:req.body.phone,
    templateId:"537707"
  }).then(result=>{
    revalue.status = 0;
    revalue.msg = result.data.status == 0 ? "验证码已发送":result.data.msg;
    res.json(revalue);
  }).catch(err=>{
    res.json(revalue);
    throw err;
  })
});

//登陆 {phone:"123123123",code:"55555"}
router.post('/login', function(req, res, next) {
  let revalue = {status:1,result:{userid:''}};
  axios.post("http://www.pudge.wang:3180/register",
  {
    phone:req.body.phone,
    code:req.body.code
  }).then(result=>{//result 为pudge接口返回数据
    // console.log(result.data)
    if(result.data.status==0){
      //成功,将用户phone和数据库比对
      revalue.status = 0;
      let sql = `select * from user where  user_phone = "${req.body.phone}" `;
      conn.query(sql, (err, results) => {//results 为数据库查询结果
        if(err)throw err;
        if(results.length){
          //用户已存在，登陆
          revalue.msg = "登陆成功，即将跳转";
          let d = new Date();
          let updateSql = `UPDATE user SET login_time="${d.toLocaleString()}" WHERE user_phone="${req.body.phone}"`;
          conn.query(updateSql,(e,r)=>{
            if(e)throw e;
            revalue.result = result.data.result;
            revalue.result.userid = results[0].user_id;
            res.json(revalue);
          });
        }else{
          //用户不存在，注册
          revalue.msg = "注册成功，即将跳转";
          let d = new Date();
          let randomName = function(){
            let str = "用户";
            for(let i=0;i<10;i++){
              str+=Math.round(Math.random()*10)
            }
            return str;
          };
          let insertSql = `INSERT INTO user (user_name, user_password,user_phone,login_time) VALUES ("${randomName()}" , "${result.data.result.token}","${req.body.phone}","${d.toLocaleString()}");`;
          conn.query(insertSql,(e,r)=>{
            if(e)throw e;
            revalue.result = result.data.result;
            revalue.result[userid] = r.insertId;
            res.json(revalue);
          })
        }
    })
    }
    else{
      //pudge接口返回错误status
      revalue.msg = result.data.msg;
      res.json(revalue);
    }
  }).catch(e=>{throw e});
})

//通过用户id 获取用户
router.post("/getuserinfo",function(req,res,next){
  let sql = `select * from user where user_id = ${req.body.id}`;
  conn.query(sql, (err, results) => {
    let obj = {
      status:1
    }
    if (err) {
      obj.msg = "失败"
      throw err
    }else{
      obj.status=0;
      obj.result = results[0];
    }
    res.json(obj);
})
});
router.post("/updateuser",function(req,res,next){
  let sql = ` UPDATE user SET user_name='${req.body.username}' WHERE user_id =${req.body.id} ;`;
  conn.query(sql, (err, results) => {
    let obj = {
      status:1
    }
    if (err) {
      obj.msg = "失败"
      throw err
    }else{
      //请求成功
      obj.status = 0;
      obj.msg = results.affectedRows?"修改成功":"用户不存在"
      // obj.result = results;
    }
    res.json(obj);
})
});
module.exports = router;



