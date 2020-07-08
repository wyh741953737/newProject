//比如一辆车10万，客户想在这基础上加配置就得加强，比如行车记录仪300等

//一般写法
// function CarPrice() {
//     this.price = 10
// }
// CarPrice.prototype = {
//     addHeatSet: function () {
//         this.hasHeatSet = true
//         this.price +=2
//     },
//     addAutoMirror: function () {
//         this.hasAutoMirror = true
//         this.price +=0.8
//     }
// }
// let car1 = new CarPrice()
// console.log(car1.price)
// car1.addHeatSet()
// car1.addAutoMirror()
// console.log(car1.price)

//装饰器写法
function Car() {
    this.price = 10
}
function carWithHeatSet(carClass) {
    carClass.hasHeatSet = true
    carClass.price += 0.2
}
function carWithHeatMirror(carClass) {
    carClass.hasHeatMirrror = true
    carClass.price += 0.8
}
let car2 = new Car()
// carWithHeatSet(car2)
// console.log(car2.price)
// carWithHeatMirror(car2)
// console.log(car2.price)

//装饰者模式定义：在不改变对象自身的基础上，在程序运行期间给对象动态的添加方法
//比如4种型号的车分别被定义为一个单独的类，如果给每个车加前灯，铃铛这两个配件，如果使用继承，要创建
//4*2个子类，通过装饰者模式，只要创建3个类
//适用场景：原有方法维持不变，在原来方法上挂载其他方法。函数解耦，将函数拆分成多个可复用的函数，再将拆分出来的函数挂载到某个函数上，实现相同效果但增强了复用性

Function.prototype.before = function (beforeFn) {
    console.log(this)
    let that = this 
    return function () {
        beforeFn.apply(this, arguments)
        return that.apply(this,arguments)
    }
}
Function.prototype.after = function (afterFn) {
    let that = this
    console.log(this)
    return function () {
        console.log('return',this)
        let ret = that.apply(this, arguments)
        afterFn.apply(this, arguments)
        return ret
    }
}
let func = function () {
    console.log('2')
}
let func1 = function () {
    console.log('1')
}
let func3 = function () {
    console.log('3')
}
func = func.before(func1).after(func3)
func()