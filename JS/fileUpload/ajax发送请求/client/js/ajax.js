function ajax(options) {
  var defaults = {
    type: 'get',
    url: '',
    data: {},
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function () {},
    error: function () {}
  } 

  Object.assign(defaults, options)

  var xhr = new XMLHttpRequest()
  var params = '' 
  for (var attr in defaults.data) {
    params += attr + '=' + defaults.data[attr] + '&'
  }
  // 截取到params倒数第二个字符位置处。
  params = params.substr(0, params.length - 1)

  if (defaults.type == 'get') {
    defaults.url = defaults.url + '?' + params 
  }

  xhr.open(defaults.type, defaults.url) 

  if (defaults.type == 'post') {
    var contentType = defaults.header['Content-Type']
    // 如果是post请求，则必须设置请求参数格式的类型
    xhr.setRequestHeader('Content-Type', contentType)

    if (contentType == 'application/json') {
      /*请求参数不管是get方式还是post方式，都是以字符串的格式进行传输的，
      所以json格式传递的参数要转换为字符串的格式进行发送*/
      xhr.send(JSON.stringify(defaults.data))
    } else {
      xhr.send(params) //如果是post方式，则将参数放在send()方法中
    }

  } else {
    xhr.send() //如果是get方式，则直接调用send()方法即可
  }

  xhr.onload = function () {
    // xhr.getResponseHeader():使用该方法获取响应头中的数据
    var contentType = xhr.getResponseHeader('Content-Type')

    var responseText = xhr.responseText

    //如果响应类型中包含 application/json 
    if (contentType.includes('application/json')) {
      // 将获取到服务端响应的结果由json字符串类型转换为json对象类型的结果
      responseText = JSON.parse(responseText)
      //如果条件成立responseText才会被转换为josn对象
      //如果条件失败，则不会被转换。responseText还是原来的形式
    }

    //http状态码等于200的时候（http状态码由服务器端返回）
    if (xhr.status == 200) {
      //请求成功 调用处理成功情况的函数
      // options.success(xhr.responseText, xhr)
      defaults.success(responseText, xhr)
    } else {
      //请求失败 调用处理失败情况的函数
      // options.success(xhr.responseText, xhr)
      defaults.error(responseText, xhr)
    }

  } //将服务器响应返回的数据作为实参传递给外部success函数、对数据给定相应的处理方式
}

// //设置默认值后的参数列表。没有传递的参数，就用默认的。传了就会覆盖默认的
// ajax({
//   url: 'http://localhost:3000/responseData',
//   success: function (data, xhr) {
//     console.log("这里是success函数")
//     console.log(data)
//   }, //定义请求的得到的数据的处理方式
// })

// //没有设置默认值的参数列表
// ajax({
//   //请求方式
//   type: 'get',
//   url: 'http://localhost:3000/first',
//   data: {
//     name: 'zhm',
//     age: 20
//   },
//   header: {
//     'Content-Type': 'application/json'
//   },
//   success: function (data, xhr) {
//     console.log("这里是success函数")
//     console.log(data)
//   }, //定义请求的得到的数据的处理方式
//   error: function (data, xhr) {
//     console.log('这里是error函数' + data)
//     console.log('这里是error函数' + xhr)
//   }
// })
