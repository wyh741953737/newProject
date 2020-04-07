function ajax(options) {
    var defaults = {
        type:'get',
        url:'',
        data:{},
        header:{
            'Content-Type':'application/x-www-form-urlencode'
        },
        success:function(){},
        error:function(){},
    }
    Object.assign(defaults,options)
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