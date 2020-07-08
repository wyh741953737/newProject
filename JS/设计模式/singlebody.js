//单例模式：

// 使用函数
// function notSingle() {
//     return {
//         a: 1
//     }
// }
// let a = notSingle()
// let b = notSingle()
// console.log(a === b) //false，指向不同对象

// //使用构造函数
// function NotSingle() {
//     return {
//         a: 1
//     }
// }
// let m = notSingle()
// let n = notSingle()
// console.log(m === n) //false

//页面的登录框：每个页面都要一个，第一次使用方法创建时创建的登录框，
//再有人使用这个方法创建登录框的时候希望返回之前已经创建的的登录框，需要判断是否创建过，没创建就创建，并且需要缓存
//实现单例模式的逻辑也是这样，在于缓存住第一次创建的对象，

// let _unique = null //全局变量，修改之后会破坏单例模式//将_unique变为私有变量，使用闭包
// function createSingle() {  
//     let obj = {
//         a:1
//     }
//     if (_unique === null) {
//         _unique = obj
//     }
//     return _unique
// }
// let a = createSingle()
// let b = createSingle()//再次创建的时候，就将已经缓存的对象返回去
// console.log(a === b) //true


let createSingle = (function () {
    let _unique = null //使用闭包让_unique私有化
    return function () {
        if (_unique === null) {
            _unique = {
                a: 1
            }
        }
        return _unique
    }
})()
let a1 = createSingle()
let a2 = createSingle()
console.log(a1 === a2)

//单例模式定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点
//实现的方法：先判断实例存在与否，存在直接返回，不存在创建后返回，这样就保证了一个类只有一个实例对象
//适用场景：弹窗，无论点击多少次，弹窗只被创建一次。
class CreateUser {
    constructor(name) {
        this.name = name
        this.getName()
    }
    getName() {
        return this.name
    }
}
//代理实现代理模式
let ProxyMode = (function () {
    let instance = null
    return function (name) {
        if (!instance) {
            instance = new CreateUser(name)
        }
        return instance
    }
})()
let p1 = new ProxyMode('p1')
let p2 = new ProxyMode('p2')
console.log(p1 === p2) //因为单例模式只实例化一次，所以实例相等