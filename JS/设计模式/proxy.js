//代理模式，为一个对象提供一个代用品或占位符，一边控制对它的访问
//比如某一个花销很大的操作，可以通过虚拟代理的方式延迟到这种需要它的时候才去创建（虚拟代理实现懒加载）
//图片懒加载方式：先通过loading图片占位，然后通过异步方式加载图片，等图片加载好了再把完成的图片加到img的src里面
let imgFun = (function () {
    let imgNode = document.createElement('img')
    document.body.appendChild(imgNode)
    return {
        setSrc: function (src) {
            imgNode.src = src
        }
    }
})()
let proxyImg = (function () {
    let img = new Image()
    img.onload = function () {
        imgFun.setSrc(this.src)
    }
    return {
        setSrc: function (src) {
            imgFun.setSrc('./loading.gif')
            img.src = src
        }
    }
})()
proxyImg.setSrc('./pic.png')