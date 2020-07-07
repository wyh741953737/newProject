//封装有两种：工厂模式和面向对象方式

//工厂模式：
function CreatePerson(name) {
    let obj = {}
    obj.name = name
    obj.eat = function () {
        console.log(name + 'eat something')
    }
    return obj
}
let p1 = CreatePerson('Eileen')
let p2 = CreatePerson('John')


//面向对象来封装 ,和工厂模式不同的是没有显示的创建一个对象，而是将属性和方法挂载到this上
function CreateCat(name) {
    this.name = name
    this.eat = function () {
        console.log(name + 'eat fish')
    }
}
let cat1 = new CreateCat('catA')
let cat2 = new CreateCat('catB')