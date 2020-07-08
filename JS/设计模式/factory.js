//工厂模式，需要重复创建对象的时候使用，
//工厂模式注重创建对象的整体思路，他不关心你想要创建的对象是怎样的。
//只需要将类型传递给工厂就可以创建出你想要的对象

// function personFactory(name,job) {
//     let obj = {}
//     obj.name = name
//     obj.job = job
//     obj.getJob = function() {
//         return this.name+' is a '+this.job
//     }
//     return obj
// }
// let student = personFactory('Eileen', 'student')
// let teacher = personFactory('John', 'teacher')
// console.log(student.getJob())
// console.log(teacher.getJob())


function Person(name) {
    this.name = name
}
Person.prototype.getName = function () {
    return this.name
}
function Car(model) {
    this.model = model
}
Car.prototype.getModel = function () {
    return this.model
}
function create(type, param) {
    if (this instanceof create) { //如果this是create的实例，说明调用了new
        return new this[type](param)
    } else {
        return new create(type,param) //否则手动调用new
    }
}
create.prototype = {
    person: Person,
    car:Car
}
let p1 = new create('person', 'Eileen') //有时候不想这些写，不想写new,就在create里判断
let p2 = new create('person','John')
let c1 = create('car', 'Benz')
let c2 = create('car','Baoma')
console.log(p1.getName())
console.log(p2.getName())
console.log(c1.getModel())
console.log(c2.getModel())