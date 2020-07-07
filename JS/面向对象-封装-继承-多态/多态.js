//不同对象调用相同方法产生不同结果
function Base() { }
Base.prototype.initial = function () {
    this.init()
}
function SubA() {
    this.init = function () {
        console.log('SubA init')
    }
}
function SubB() {
    this.init = function () {
        console.log('SubB init')
    }
}
SubA.prototype = new Base()
SubB.prototype = new Base()
let suba = new SubA()
let subb = new SubB()
suba.init()
subb.init()