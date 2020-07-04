function Father(name) {
    this.name = name
}
Father.prototype.getName = function () {
    console.log('hello')
}
Son.prototype = new Father('Eileen')
function Son(age) {
    age: age
    console.log('Son构造函数的age',age)
}

let son = new Son(12)
console.log(son.name)
