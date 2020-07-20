事件对象：
    事件对象是用来记录事件发生时相关信息的对象。如鼠标移动事件对象.clintX获取鼠标距离浏览器左边距离
    事件只有被触发才会产生，这个事件对象只能在函数中被访问，事件函数运行结束，事件对象销毁。

事件对象获取：


在js事件流中，有两种流：事件冒泡流，事件捕获流。
事件冒泡流：也叫IE事件流，就是在嵌套的元素中，给存在嵌套关系的多个元素设置同种的事件类型(窗口事件，表单事件，键盘事件（键盘按下松开），鼠标事件（鼠标移动点击），当触发最内层最具体的那个元素的事件时，那么外层设置了相同事件类型的元素会被依次执行。所有事件处理程序默认都是事件冒泡

DOM0级事件处理程序只有冒泡流

事件捕获流：
    也叫网景事件流，和事件冒泡流相反，嵌套元素设置相同的事件类型，

原生事件：
    DOM0级：所有浏览器都支持，只能注册一种事件
        绑定：document.getElementById('ingg').onclick = function(){}
        解除绑定：document.getElementById('ingg').onclick = null
        绑定:<div onclick="func()"></div>
    DOM2事件类型：注册多种事件，增加了捕获和冒泡的概念
        冒泡：存在多个嵌套关系的标签绑定了相同类型事件，当触发最内层最的事件，由内而外直到window
        捕获：某个元素触发了某个事件最先得到通知的是window，由外而内，直到真正触发事件元素为止
        绑定：addEventListener（事件冒，事件回调，捕获/冒泡）false为冒泡，true为捕获
        var x = document.getElementById('ingg')
        if(x.addEventlistener) {
            addEventListener('click',function(){},false)
        } else if(x.attachEvent) {
            x.addEventListener('onclick',function(){})
        }

一个DOM元素绑定2个事件，一个冒泡，一个捕获，则事件执行多少次，顺序如何？
事件执行顺序：其他元素捕获阶段-》本元素代码顺序事件-》其他事件冒泡阶段

DOM事件流：冒泡、捕获
    阻止事件冒泡：
        其他浏览器：e.stopPropagation()阻止冒泡捕获
        IE:e.cancelBubble = true 只能阻止冒泡
        function stopBubble(e) {
            if(e && e.stopPropagation)   e.stopPropagation()
            else window.event.cancelBubble = true
    阻止默认事件：
        其他浏览器：e.preventDefault()
        IE:e.returnValue = false
        function stopDefault(e) {
        
            if(e && e.preventDefault) e.preventDefault()
            else window.event.returnValue = false
        }

事件委托：利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件
使用事件委托只需要在DOM树中尽量最高层上添加一个事件处理程序
事件委托优点：整个页面占用的内存更少

事件委托：通俗点就是onclick，onmouseover，onmouseout等等，
使用事件委托能让你避免给每个节点添加事件监听器，而是给父元素添加

事件委托案例：：比如ul里面有4个li，你给li添加了事件，你再次添加li的时候，li没有事件监听了
window.onload = function() {
    var oui = document.geetElementById('ul')
    var oli = document.geetElementById('li')
    for(var i=0;i<oli.length;i++) {
        oli[i].onmouseover = function() {
            this.style.background = "red
        }
        oli[i].onmouseout = function() {
            this.style.background = "pink
        }
    }
}

使用事件委托来做：
window.onload = function() {
    oul.onmouseOver = function(e) {
        var e = e|| window.event
        var target = e.target || e.srcElement
        if(target.nodeName.toLowercase() === 'li') {
            target.style.background = 'red
        }
    }
     oul.onmouseOut
      = function(e) {
        var e || window.event
        var target = e.target || e.srcElement
        if(target.nodeName.toLowercase() === 'li') {
            target.style.background = 'red
        }
    }
}