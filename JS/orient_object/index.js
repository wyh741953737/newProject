var that
class Tab {
    constructor(id) {
        that = this
        this.updateNode()
        this.main = document.getElementById(id)
        this.add = document.querySelector('.tabadd')
        this.ul = document.querySelector('.ul-list')
        this.father = document.querySelector('.tabscon')
        
        this.init()
    }
    init() {
        //init初始化操作让相关元素绑定事件
        this.updateNode()
        this.add.onclick = this.addTab
        //也可以使用事件委托
        for(var i=0;i<this.lis.length;i++) {
            this.lis[i].index = i
            this.lis[i].onclick = this.toggleTab
            this.remove[i].onclick = this.removeTab //冒泡，阻止
        }
    }
    updateNode() {//解决后面添加的元素没有绑定事件
        this.lis = document.querySelectorAll('li')
        this.section = document.querySelectorAll('section')
        this.remove = document.querySelectorAll('.delete')
    }
    toggleTab() {
        that.clearClass()
        this.className = 'active'
        that.section[this.index].className = 'conaction'
    }
    clearClass() {
        for(var i=0;i<this.lis.length;i++) {
            this.lis[i].className = ''
            this.section[i].className = ''
        }
    }
    addTab() {
        that.clearClass()
        let li = '<li class="active"><span>选项卡</span><div>*</div></li>'
        var session = '<section class="conaction">试1</section>'
        //element.insertAdjaceHTML(position,text)
        that.ul.insertAdjacentHTML('beforeend',li)
        that.father.insertAdjacentHTML('beforeend',session)
        that.init()
    }
    removeTab(e) {
        e.stopPropagation() ? e.stopPropagation : e.cancelbubble=true;        
        var index = this.parentNode.index
        that.lis[index].remove()
        that.section[index].remove()
        that.init()
        //当我们删的不是选中的，选中状态不改变
        if(document.querySelector('.active')) return
        //当我们删除选中状态li，让他的第一个li处于选的状态
        index--
        that.lis[index] && that.lis[index].click()
    }
    editTab() {

    }
}
var tab = new Tab('#tab')
