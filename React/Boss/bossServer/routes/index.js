var express = require('express');
var mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true)
var router = express.Router();
const md5 = require('blueimp-md5')
const filter = {password:0,_v:0}//查询时指定过滤出属性，不把密码发送回去
const { UserModel,ChatModel } = require('../bin/db/modules')
/*注册路由
（密码md5加密，cookie设置在客户端存储时间，注册好直接登陆，cookie里参数用户userid，持久化时间下次免登陆。），并且发送成功信息。
*/
router.post('/register',function(req,res) {
  const { username,password,type} = req.body
  UserModel.findOne({username},function(err,user) {
    if(user) {
      res.send({code:1,msg:'此用户已存在'})
    } else {
      new UserModel({username,password:md5(password),type}).save(function(error,user) {
        res.cookie('userid',user._id,{maxAge:1000*60*60*24})
        const data={username,type,_id:user._id}
        res.send({code:0,data})
      })
    }
  })
})
/**登录路由 */
router.post('/login',function(req,res) {
  const {username,password} = req.body
  UserModel.findOne({username,password:md5(password)},filter,function(err,user) {
    if(user) {
      res.cookie('userid',user._id,{maxAge:1000*60*60*24})
      res.send({code:0,data:user})
    } else {
      res.send({code:1,msg:'用户名或者密码不对'})
    }
  })
})
/**更新用户完善的信息路由 */
router.post('/update',function(req,res) {
  const userid = req.cookies.userid
  const user = req.body
  if(!userid) {
    return res.send({code:1,msg:'请先登录'})
  }
  UserModel.findByIdAndUpdate({_id:userid},user,function(error,oldUser) {
    if(!oldUser) {
      res.clearCookie('userid')
    } else {
      const {_id,username,type} = oldUser
      const data = Object.assign(user,{_id,username,type})
      res.send({code:0,data})
    }
  })
})
//获取用户信息的路由
// router.get('/user',function(req,res){
//   const userid=req.cookies.userid
//   if(!userid){
//     return res.send({code:1,msg:'请先登录'})
//   }
//   UserModel.findOne({_id:userid},filter,function(error,user){
//     res.send({code:0,data:user})
//   })
// })
//获取用户列表（根据类型）
// router.get('/userlist',function(req,res){
//   const {type }=req.query
//   UserModel.find({type},filter,function(error,user){
//     res.send({code:0,data:user})
//   })
// })

//获取当前用户所有聊天信息列表
// router.get('/msglist',function(req,res){
//   const userid=req.cookies.userid//获取当前用户userid
//   UserModel.find(function(err,allusers){ //查询得到所有user数组。过去
//   const users={}
//   allusers.forEach(user => {
//     users[user._id]={username:user.username,header:user.header}
//   })
//     /*查询userid相关的所有聊天信息
//     *参数1：查询条件，$or或，from和to条件中满足一个，users市所有用户对象信息，chatMsgs市消息数组包括是否读了，from，to，内容，时间
//     *参数2：过滤条件，
//     *参数3：回调函数
//      */
//     ChatModel.find({'$or':[{from:userid},{to:userid}]} ,filter,function(err,chatMsgs){
//       res.send({code:0,data: {users,chatMsgs} })
//     })


//   })
// })

//修改指定消息为已经读了
// router.post('/readmsg',function(req,res){
//   const from=req.body.from
//   const to=req.cookies.userid
//   /*更新数据库中的chat数据
//   *参数1：查询条件
//   *参数2：更新为指定的数据对象
//    * 参数3：是否一次更新多条，默认一条
//    */
//   ChatModel.update({from ,to ,read:false},{read:true },{multi:true},function(err,user){
//     console.log('/readmsg',user)
//     res.send({code:0,data:user.nModified})//更新的数量
//   })
// })
module.exports = router;
