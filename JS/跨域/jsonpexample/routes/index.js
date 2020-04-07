var express = require('express');
var router = express.Router();
var app = express()
var path = require('path')
app.use(express.static(path.join(__dirname,'public')))

app.get('/test',(req,res) => {
  // const fName = req.query.callback
  // const data = JSON.stringify({name:'Eileen',age:12})
  // const result = fName + '('+data+')'
  // res.send(result)
  //express提供了jsonp方法内部做的就是上面的事情
  res.jsonp({name:'lili',age:12})
})
app.get('/cross',(req,res) => {
  //允许哪些客户端，使用什么方法访问
  res.header('Access-Control-Allow-Origin','*')
  res.header('Access-Control-Allow-Origin','get,post')
  res.send('ok')
})
app.listen(3001)
console.log('服务器启动成功')
module.exports = router;
