function ajax(options) {
    var defaults = {
        type:'get',
        url:'',
        data:{},
        header:{
            'Content-Type':'application/x-www-form-urlencode'
        },
        success: function() {},
        error:function() {}
    }
    Object.assign(defaults,options)
    var xhr = new XMLHttpRequest()
    var params = ''         
    for(var attr in defaults.data) {
        params += attr +'=' + defaults.data[attr] + '&'
    }
    params = params.substr(0,params.length-1)
    if(defaults.type == 'get') {
        defaults.url = defaults.url + '?' +params
    }
    xhr.open(defaults.type,defaults.url)
    if(defaults.type == 'post') {
        //由于Content-Type中带了-，-如果不是字符串，在js中就不合法。所以放在[]
        var contentType = options.header['Content-Type']
        xhr.setRequestHeader('Content-Type',contentType)
        if(contentType == 'application/json') {
            xhr.send(JSON.stringify(options.data))
        } else {
            xhr.send(params)
        }
    } else {
        xhr.send()
    }    
    xhr.onload() = function() {
        var contenttype = xhr.getResponseHeader('Content-Type')
        if(contenttype.includes('application/json')) {
            defaults.success(xhr.responseText)
        } else {
            defaults.error(xhr.responseType,xhr)
        }
    }
    
}