ajax：在不刷新页面的情况下，局部更新页面中的数据。比如加载更多
      1，页面上拉加载更多
      2，数据分页
      3，表单数据验证
      4搜索框文字提示
ajax原理：ajax就像是代理人，由ajax代理浏览器发送请求并接收服务器响应的数据。浏览器直接向服务器发送请求和服务器响应的过程是不可控的
         通过ajax代理是开发人员可控的
ajax实现步骤
   1：创建ajax对象
     var xhr = new XMLHttpRequest()
   2:告诉ajax请求地址及请求方式
      xhr.open('get','http://www.baidu.com')
   3：发送请求
      xhr.send()
   4：获取服务器端给客户端的响应数据
      xhr.onload = function() {
         console.log(xhr.responseText)
      }
服务端大多数情况下以json对象作为响应数据的格式，但是在http请求与响应的过程中，无论是请求参数还是响应内容，如果是对象类型，最终都会被转换为对象字符串进行传输。所以客户端拿到数据之后还要进行JSON.parse（）来转化为json对象
Get请求方式
   拼接请求参数
   var params = 'name'+nameValue+'&age=' +ageValue
   xhr.open('get','http://www.login.com?/login'+params);
Post请求参数
   xhr.setRequestHeader('content-type','application/x-www-form-urlencode')
   post请求必须在请求报文中明确请求参数的类型，content-type值。
   xhr.send('name=zs&age=12')

请求报文：在http请求和响应的过程中传递的数据块就是报文。
          报文头：客户端向服务器说的话
          报文体：存储一些内容比如post
在服务器端通过body-parser这个模块就可以通过req.body获取post请求参数
请求参数的格式也可以是：属性名称=属性值  application/x-www-form-urlencoded
还可以是：json数据格式 application/json。  JSON.stringfy()将json转化为json字符串
res.send(JSON.Stringfy({name:'a',age:12}))

Ajax状态码
0：请求未初始化（还没调用open（））
1：请求已经建立，但还没有发送（还没调用send）
2：请求已经发送
3：请求正在处理中，通常响应中已经有部分数据可以用
4：响应已经完成，可以获取并使用服务器的响应了
xhr.readyState获取状态码
步骤：
   var xhr = new XHRHttpRequest()
   xhr.open('get','http://localhost:3000/read')
   xhr.onreadystatechange = function(){
      if(res.readyState == 4 && xhr.status == 200) {

      }
   }
   xhr.send() //send要放在onreadystatechange后面
onload和ajax状态码两种方式区别：
1：兼容性：onload不兼容低版本ie，onreadystatechange兼容
2：onload不需要判断ajax状态码
3：被调用次数：onload一次所以效率高一点，onreadystatechange多次


301永久重定向
302临时重定向
304 未改变
400 语法错误
401 
500 服务器出错

低版本IE浏览器中，ajax请求有严重缓存问题：请求地址不变情况下，只有第一次请求会真正发送到服务器端，第二次请求同一地址，即使服务器端数据更新了，服务器也还是直接从缓存中取出返回给客户端
解决方案：在请求地址后面加请求参数，保证每次请求中的请求参数值不同
xhr.open('get','http://www.example.com?t='+Math.random())

封装ajax
function ajaxWrap(options) {
   var defaults = {
      type:'get',
      url:'',
      data:{},
      header:{
         'Content-Type':'application/x-www-form-urlencode'
      }
      success:function(){},
      error:function(){},
   }
   Object.assign(default,options)
   var xhr = new XMLHttpRequest();
   var params='';
   for(var a in defaults.data) {
      //将参数转换为字符串格式
      params += a + '=' + defaults.data[a] + '&'
   }
   params = params.substr(0,params.length - 1)
   if(defaults.type == 'get') {
      defaults.url=defaults.url + '?' +params
   }
   xhr.open(defaults.type,defaults.url);
   if(defaults.type == 'post') {
      var contentType = defaults.header['Content-Type']
      xhr.setRequestHeader('Content-type',contentType)
      if(contentType == 'application/json') {
         xhr.send(JSON.stringfy(defaults.data))
      } else{
          xhr.send(params)
      }
   } else{
      xhr.send()
   }
   xhr.send();
   xhr.onload = function() {
      var contenttype = xhr.getResponseHeader('Content-Type')
      if(contenttype.includes('application/json')) {
          responseText = JSON.parse(responseText)
      }
      if(xhr.status == 200) {
         defaults.success(xhr.responseText)
      } else {
         defaults.error(xhr.responseText,xhr)
      }
      
   }
}
ajaxWrap({
   url:'http://localhost:3000/first',
   data:{
      name:zs,
      age:20
   },
   success:function(data) {
      console.log(data)
   }
   error:function(data,xhr) {
      console.log(data,xhr)
   }
})

请求参数格式：json   
            属性名：属性值
传递对象数据类型对于函数的调用者更加友好
在函数内部对象数据类型转化为字符串数据类型更加方便


FormData的作用
    1：模拟html表单，自动将表单对象的数据拼接成请求参数的格式(querystring)
    2：异步上传二进制文件
不用给表单控件添加id属性，也没有获取表单控件和值，将值拼接成一定的格式。这些都有formdata做好了


xhr参数
   1：xhr.onloaded 监听请求完成事件
   2：xhr.tiomout 监听请求超时
   3：xhr.onload 监听请求成功
   4：xhr.onerr 监听请求失败
   5：xhr.onabort 监听请求终止
   6：xhr.onprogress 监听数据传输进行中事件
   7：xhr.onloadstart 监听开始事件
   8：xhr.upload 该属性指向XMLHTTPREQUEST上传对象
   9：xhr.withcredentials 跨域请求是否提供凭证cookie，http认证以及

   普通ajax不能像服务传递二进制文件，比如图片，使用formdata就可以解决