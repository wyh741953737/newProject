function $ajax(options) {
    var defaults = {
        type:'get',
        url:'',
        data:{},
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        success: function() {},
        error:function(){}
        
    }
    Object.assign(defaults,options)
    return new Promise((resolve,reject) => {
        var xhr = new XMLHttpRequest
        var params = ''
        if(defaults.type == 'get') {
            for(var attr in defaults.data) {
                params += attr +'&' + defaults.data[attr]
            }
            params = params.substr(0,params.length-1)
            defaults.url = defaults.url+'?'+params
        }
        xhr.open(defaults.type,defaults.url)
        contentType = defaults.header['Content-Type']
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                if(/^(2|3)\d{2}$/.test(xhr.status)) {
                    resolve(JSON.stringify(xhr.responseText))
                    return
                }
                reject(xhr)
            }
        }
        if(defaults.type == 'post') {
            Object.keys(options.header).forEach(key => {
                xhr.setRequestHeader(key,options.header[key])
            })
            xhr.send(params)
        }
        xhr.send()
    })
}
function $formatFileName(filename) {
    console.log(filename)
    //xxx.xxx.xxx.png
    var dotIndex = filename.lastIndexOf('.')
    var name = filename.substr(0,dotIndex-1)
    var suffix = filename.substr(dotIndex,dotIndex+1)
    // name = md5(name) + new Date().getTime()
    name = name + new Date().getTime
    return {
        hash:name,
        suffix,
        filename:`$(name).$(suffix)`
    }
}