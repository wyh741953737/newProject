// function personFactory(name,job) {
//     let obj = {}
//     obj.name = name
//     obj.job = job
//     obj.getJob = function() {
//         console.log(this.name+' is a '+this.job)
//     }
//     return obj
// }
// let student = personFactory('Eileen', 'student')
// let teacher = personFactory('John', 'teacher')
// console.log(student.getJob())
// console.log(teacher.getJob())

// let Timer = setTimeout(() => {
//  console.log(Timer)  
//  console.log('m',Timer2)
// });
// let Timer2 = setTimeout(() => {
//     console.log(Timer2)  
     
// },1000);
// console.log('e')
function isType(type,value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`
}
let currying = (fn, arr = []) => {
    let len = fn.length
    return function (...args) {
        arr = [...arr, ...args]
        if (arr.length < len) {
            return currying(fn,arr)
        } else {
            return fn(...arr)
        }
    }
} 
// function curry(fn) {
//     let len = fn.length
//     return function temp() {
//         let args = [...arguments]
//         if(args.length >= len) {
//             return fn(...args)
//         } else {
//             return function() {
//                 temp(...args,...arguments)
//             }
//         }
//     }
// }
let isArray = currying(isType)('Array')
console.log(isArray(['']))