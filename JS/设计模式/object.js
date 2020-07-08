/**
 * 多种对象出现的时候代码重复度比较高
 * 我们使用封装，封装可以用工厂模式和继承模式
 */

// let person = {
//     name: 'Eileen',
//     job: 'stugent',
//     getJob: function () {
//         console.log(this.name+'is a '+this.job)
//     }
// }
// let teacher = {
//     name: 'John',
//     job: 'teacher',
//     getJob: function () {
//         console.log(this.name+'is a '+this.job)
//     }
// }
// person.getJob()
// teacher.getJob()

/**使用面向对象的方法进行封装 */
function CreatePerson(name, job) {
    this.name = name
    this.job = job
}
CreatePerson.prototype.getJob = function () {
    console.log(this.name+'do'+this.job)
}
let eileen = new CreatePerson('Eileen', 'woman')
let john = new CreatePerson('John', 'man')
console.log(eileen.getJob())
console.log(john.getJob())