var express = require('express');
var router = express.Router();
var app = express()
var path = require('path')
var request = require('request')
var formidable = require('formidable')
app.use(express.static(path.join(__dirname,'public')))
//cors实现跨域
// var corsOptions = {
//   origin: 'http://localhost:8080',
//   credentials: true,
//   maxAge: '1728000'
// }
// app.use(require('cors')(corsOptions))
//或者不用cors模块
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://127.0.0.1:8080'); //需要显示设置来源
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials",true); //带cookies7    
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


//jsonp跨域
app.get('/jsonp',(req,res) => {
  // const fName = req.query.callback
  // const data = JSON.stringify({name:'Eileen',age:12})
  // const result = fName + '('+data+')'
  // res.send(result)
  //express提供了jsonp方法内部做的就是上面的事情
  res.jsonp({name:'lili',age:12})
})
app.get('/cross',(req,res) => {
  
  res.send('ok')
})
app.post('/login',(req,res) => {
  
  formidable.IncomingForm().parse(req,(err,fields,file) => {
    const {username,password} = fields
    if(username == 'Eileen' && password =='1') {
      res.send({message:'登录成功'})
    } else {
      res.send({message:'登录失败'})
    }
  })
})
//server
app.post('/server',(req,res) => {
  request('http://localhost:3002/server',(err,response,body) => {
    res.send(body)
  })
})
app.listen(3001)
console.log('服务器启动成功')
module.exports = router;
