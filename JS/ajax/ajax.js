function $ajax(options) {
    options = Object.assign(
        {
            methods:'post',
            url:'',
            data:{},
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            success: function() {},
            error:function() {}
        },options)
    let xhr = new XMLHttpRequest()
    let params = ''
    for(let atr in options.data) {
        params += atr + '=' + options.data[atr] + '&'
    }
    params = params.substr(0,params.length-1)
    if(options.methods == 'get') {
        options.url = url + '?' + params
    }
    console.log('参数',params)
    xhr.open(options.methods,options.url)
    if(options.methods == 'post') {
        let contentType = options.headers['Content-Type']
        xhr.setRequestHeader('Content-Type',contentType)
        if(options.headers['Content-Type'] == 'application/json') {
            xhr.send(JSON.stringify(options.data))
        }
        xhr.send(params)
    } else {
        xhr.send()
    }
    xhr.onload = function() {
        let contentType = xhr.getResponseHeader('Content-Type')
        let responseText = xhr.responseText
        if(contentType.includes('application/json')) {
            responseText = JSON.parse(responseText)
        }
        if(xhr.status == 200) {
            options.success(responseText,xhr)
        } else {
            options.error(responseText,xhr)
        }
    }    
}
function $formdatFileName(filename) {
    let dotIndex = filename.lastIndexOf('.')
    let name = filename.substring(0,dotIndex)
    let suffix = filename.substring(dotIndex+1)
    //name = md5(name) + new Date().getTime()
        name = name + new Date().getTime()
    return {
        hash:name,
        suffix,
        filename:`${name}.${suffix}`
    }
}