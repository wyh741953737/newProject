//封装一个用来进行2d转换的方法，为了避免命名冲突，使用命名空间
(function (w) {
    w.damu = {}
    w.damu.css = function css(node, type, val) {
        if (typeof node === "object" && typeof node["transform"] === "undefined") {
            node["transform"] = {}
        }
        if (arguments.length >= 3) { //设置样式
            var text = ""
            node["transform"][type] = val
            for (item in node["transform"]) {//for in会遍历原型上是属性，我们只需要遍历对象自身属性上属性，hasOwnProperty
                if (node["transform"].hasOwnProperty(item)) {
                    switch (item) {
                        case "translateX":
                        case "translateY":
                            text += item + "(" + node["transform"][item] + "px)";
                            break;
                        case "scale":
                            text += item + "(" + node["transform"][item] + ")"
                            break;
                        case "rotate":
                            text += item + "(" + node["transform"][item] + "deg)"
                            break;
                    }
                }
            }
            node.style.transform = node.style.webkitTransform = text
        } else if (arguments.length == 2) { //获取样式
            nvalue = node["transform"][type]
            if (typeof nvalue === "undefined") {
                switch (type) {
                    case "translateX":
                    case "translateY":
                    case "rotate":
                        nvalue = 0;
                        break;
                    case "scale":
                        nvalue = 1;
                        break;
                }
            }
            return nvalue
        }
    }
    w.damu.carousel =  function(arr) {
        var carouselWrap = document.querySelector('.carousel-wrap')
        if(carouselWrap) {
            var pointLength = arr.length
            var needCarousel = carouselWrap.getAttribute('needCarousel') //无缝滑屏
            needCarousel = needCarousel == null ? false : true
            if(needCarousel){
                arr = arr.concat(arr)
            }
            var ulNode = document.createElement('ul')
            var styleNode = document.createElement('style')
            ulNode.classList.add('list')
            for(var i=0;i<arr.length;i++) {
                ulNode.innerHTML+='<li><a href="javascript:;"><img src="'+arr[i]+'"/></a></li>'
            }
            styleNode.innerHTML = ".carousel-wrap>.list{width:"+arr.length+"00%}.carousel-wrap>.list>li{width:"+(1/arr.length*100)+"%;}"
            carouselWrap.appendChild(ulNode)
            document.head.appendChild(styleNode)
            var imgNode = document.querySelector('.carousel-wrap>.list>li>a>img') //要放在后面，同步，放前面img还没添加进去
            setTimeout(function() {//延迟，同步的话获取不到
                carouselWrap.style.height = imgNode.offsetHeight+'px'
            }, 100);

            //圆点
            var pointWrap = document.querySelector('.carousel-wrap>.point-wrap')
            if(pointWrap) {
                    for(var i = 0; i<pointLength; i++) {
                    pointWrap.innerHTML += '<span></span>'
                }
                var pointsSpan = document.querySelectorAll('.carousel-wrap>.point-wrap>span')
                pointsSpan[0].classList.add("active")
            }

            //滑屏
            var startX = 0 //手指开始位置
            var elementX = 0 //元素位置
            var translateX = 0
            var index = 0
            carouselWrap.addEventListener('touchstart',function(e) {
                e = e || event
                var TouchC = e.changedTouches[0] //触发当前事件的手指列表                       
                if(needCarousel) {
                    var index = damu.css(ulNode,"translateX")/document.documentElement.clientWidth
                    if(-index === 0) { //如果是第一张
                         index = -pointLength//pointLength是第二组第一张                
                    } else if(-index == (arr.length-1)) { //点击第二组的最后一张 arr.length-1 =9
                        index = -(pointLength-1) //第二组的最后一张跳到第一组的最后一张pointLength-1=4
                    }
                    damu.css(ulNode,"translateX",index*document.documentElement.clientWidth)
                }
                startX = TouchC.clientX //当前手指触发时候的水平坐标                  
                elementX = damu.css(ulNode,'translateX')  
                clearInterval(timer)
            })
            carouselWrap.addEventListener('touchmove',function(e) {
                e = e || event
                var TouchC = e.changedTouches[0]
                var nowX = TouchC.clientX//获取事件触发时鼠标指针的水平坐标
                var disX = nowX - startX //获取移动的距离
                damu.css(ulNode,'translateX',disX+elementX)
            })
            carouselWrap.addEventListener('touchend',function(e) {
                e = e || event
                ulNode.style.transition = 'none'
                index = damu.css(ulNode,'translateX')/document.documentElement.clientWidth
                index = Math.round(index)
                //超出控制
                if(index > 0) {
                    index = 0
                } else if(index < 1-arr.length) {
                    index = 1-arr.length
                }
                // for(var i=0;i<pointsSpan.length;i++) {
                //     pointsSpan[i].classList.remove("active")                            
                // }
                // pointsSpan[-index%pointLength].classList.add("active") //逢五进一，逢图片最大长度进一
                radiusPoint(index)
                ulNode.style.transition = '1s left'
                damu.css(ulNode,'translateX',index*(document.documentElement.clientWidth))
                if(needAuto){
                    auto()
                 }
            })
            var timer = 0
            var needAuto = carouselWrap.getAttribute('needAuto') //无缝滑屏
            needAuto = needAuto == null ? false : true
            if(needAuto){
                auto()
            }
            function auto() {
                clearInterval(timer)
                timer = setInterval(function() {
                    if(index == 1-arr.length) {
                        ulNode.style.transition = "none"
                        index = 1-arr.length/2
                        damu.css(ulNode,"translateX",index*document.documentElement.clientWidth)
                    }
                    setTimeout(() => {
                        index--
                        ulNode.style.transition = "1s transform"
                        radiusPoint(index)
                        damu.css(ulNode,"translateX",index*document.documentElement.clientWidth)
                    }, 50);
                },2000)
            }
            function radiusPoint(index) {
                if(!pointWrap) return
                for(var i=0;i<pointsSpan.length;i++) {
                    pointsSpan[i].classList.remove("active")                            
                }
                pointsSpan[-index%pointLength].classList.add("active") 
            }
        }
    }
})(window)
//使用命名空间来解决命名冲突。==》到模块化