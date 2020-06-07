var express = require('express');
var cors = require('cors')
var path = require('path')
var fs = require('fs')
var mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true)
var router = express.Router();
var request = require('request')
const md5 = require('blueimp-md5')
const upload_dir = path.resolve(__dirname, './public/uploads')
const filter = {password:0,_v:0}//查询时指定过滤出属性，不把密码发送回去

const { UserModel,ChatModel } = require('../bin/db/modules')
router.use(cors())
router.use(express.static('public'))
/*注册路由
*router的post方法，接受两个参数，第一个url，第二个回调函数。
*使用userModel的findone方法，查询参数username来判断数据库中是否有同名用户。如果有，通过res.send发送已存在的信息。
*如果没有，把username，password，type等信息通过save方法存进数据库
（密码md5加密，cookie设置在客户端存储时间，注册好直接登陆，cookie里参数用户userid，持久化时间下次免登陆。），并且发送成功信息。
*/

router.post('/register',function(req,res) {
  const { username,password,type} = req.body
  console.log('jjj',{ username,password,type})
  UserModel.findOne({username},function(err,user) {
    console.log(user);
    if(user) {//判断用户是否存在，存在，注册失败

    res.send({code:1,msg:'此用户已存在'})

    }else{//注册成功，存入数据库
      new UserModel({username,password:md5(password),type}).save(function(error,user){
        res.cookie('userid',user._id,{maxAge:1000*60*60*24})
        const data={username,type,_id:user._id}
        res.send({code:0,data})
      })
   
    }
  })
  
})
router.post('/login',function(req,res){
  const {username,password}=req.body
  //根据用户名和密码判断,通过UserSchema查找，用户名，密码，回调函数（如果存在用户名，密码正确，用cookie长久保存，发送到数据存储
  UserModel.findOne({username,password:md5(password)},filter,function(err,user){
    if(user){
      res.cookie('userid',user._id,{maxAge:1000*60*60*24})
      res.send({code:0,data:user})
    }else{
      res.send({code:1,msg:'用户名或者密码不对'})
    }
  })
})

router.post('/update',function(req,res){
  const userid = req.cookies.userid
  if(!userid){
   return  res.send({code:1,msg:'请先登陆'})
  }
  const user=req.body
  UserModel.findByIdAndUpdate({_id:userid},user,function(error,oldUser){
    if(!oldUser){
      res.clearCookie('userid')
      res.send({code:1,msg:'请先登陆'})
    } else{
      const {_id,username,type} =oldUser
      const data=Object.assign({_id,username,type},user)
      res.send({code:0,data})
    }
  })
})
//获取用户信息的路由
router.get('/user',function(req,res){
  const userid=req.cookies.userid
  if(!userid){
    return res.send({code:1,msg:'请先登录'})
  }
  UserModel.findOne({_id:userid},filter,function(error,user){
    res.send({code:0,data:user})
  })
})
//获取用户列表（根据类型）
router.get('/userlist',function(req,res){
  const {type }=req.query
  UserModel.find({type},filter,function(error,user){
    res.send({code:0,data:user})
  })
})

//获取当前用户所有聊天信息列表
router.get('/msglist',function(req,res){
  const userid=req.cookies.userid//获取当前用户userid
  UserModel.find(function(err,allusers){ //查询得到所有user数组。过去
  const users={}
  allusers.forEach(user => {
    users[user._id]={username:user.username,header:user.header}
  })
    /*查询userid相关的所有聊天信息
    *参数1：查询条件，$or或，from和to条件中满足一个，users市所有用户对象信息，chatMsgs市消息数组包括是否读了，from，to，内容，时间
    *参数2：过滤条件，
    *参数3：回调函数
     */
    ChatModel.find({'$or':[{from:userid},{to:userid}]} ,filter,function(err,chatMsgs){
      res.send({code:0,data: {users,chatMsgs} })
    })


  })
})

//修改指定消息为已经读了
router.post('/readmsg',function(req,res){
  const from=req.body.from
  const to=req.cookies.userid
  /*更新数据库中的chat数据
  *参数1：查询条件
  *参数2：更新为指定的数据对象
   * 参数3：是否一次更新多条，默认一条
   */
  ChatModel.update({from ,to ,read:false},{read:true },{multi:true},function(err,user){
    console.log('/readmsg',user)
    res.send({code:0,data:user.nModified})//更新的数量
  })
})
router.post('/uploadliscence',function(req,res) {
  let {chunk,filename } = req.body
  let chunk_dir = `${upload_dir}/${filename}`
  chunk = decodeURIComponent(chunk).replace(/^data:image\/\w+;base64,/,"")
  chunk = Buffer.from(chunk,'base64')
  console.log(chunk)
  fs.writeFileSync(chunk_dir,chunk)
  res.send({
    code:0,
    codeText:'',
    path:`http://127.0.0.1:3005/uploads/${filename}`
  })
})
module.exports = router;
