function $ajax(options) {
  options = Object.assign({
    url:'',
    method:'post',
    data:null,
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded' 
    }
  },options)
  return new Promise((resolve,reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open(options.method,options.url)
    xhr.onreadystatechange = () => {
      console.log(xhr)
      // if(xhr.readyState === 4) {
      //   if(/^(2|3)\d(2)$/.test(xhr.status)) {
      //     resolve(JSON.parse(xhr.responseText))
      //     return
      //   }
      //   reject(xhr)
      // }
    }
    console.log('我是数据',options.data)
    xhr.send(options.data)
  })
}

function $formdatFileName(filename) {
  let dotIndex = filename.lastIndexOf('.'),
      name = filename.substring(0,dotIndex)
      suffix = filename.substring(dotIndex + 1)
      return {
        hash:name,
        suffix,
        filename:`${name}.${suffix}`
      }
}