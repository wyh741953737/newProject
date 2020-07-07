//类式继承，缺点：父类构造函数不接收参数；父类构造函数的1私有属性和方法变成公有

function Father(name) {
    this.name = name
    this.list = [1, 2, 3]
}
Father.prototype.getName = function () {
    return this.name
}
function Son(name) {
    this.subname = name
}
Son.prototype = new Father()
let son = new Son('Eileen')
console.log(son.getName()) //undefined
console.log(son.name, son.subname) //undefined Eileen



//构造函数继承，缺点：父类构造函数原型上的方法获取不到
function Father2(name) {
    this.name = name
    this.list = [1,2,3]
}
Father2.prototype.getName = function () {
    return this.name
}
function Son2(name) {
    Father2.call(this,name)
    this.subname = name
}
let son2 = new Son2('Hello')
// console.log(son2.getName()) //报错
console.log(son2.name, son2.subname) //Hello Hello



//组合继承 缺点：__proto__上的属性没有用；执行了两次构造函数
function Father3(name) {
    this.name = name
    this.list = [1,2,3]
}
Father3.prototype.getName = function () {
    return this.name
}
function Son3(name) {
    Father3.call(this,name)
    this.subname = name
}
Son3.prototype = new Father3()
let son3 = new Son3('Son3') 
console.log(son3.getName())//Son3
console.log(son3.name, son3.subname) //Son3,Son3


//寄生组合继承
function Father4(name) {
    this.name = name
    this.list = [1,2,3]
}
Father4.prototype.getName = function () {
    return this.name
}
function Son4(name) {
    Father4.call(this,name)
    this.subname = name
}
function inhert(SonC, FatherC) {
    function F() { }
    F.prototype = FatherC.prototype
    SonC.prototype = new F()
    SonC.prototype.constructor = SonC
}
inhert(Son4, Father4)
let son4 = new Son4('Son4')
console.log(son4.getName()) //Son4
console.log(son4.name, son4.subname) //Son4 Son4
