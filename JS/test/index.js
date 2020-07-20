// // 匿名函数自调用
// (function (params) {
//     //Promise接收一个参数，我们用的时候是(resolve,reject)=>{}这个函数,那这里参数就叫executor执行器函数
//     function Promise(excutor) {
//         const PENDING = 'pending'
//         const RESOLVED = 'resolved'
//         const REJECTED = 'rejected'
//         let that = this
//         that.status = PENDING //给Promise对象指定状态，初始值pending
//         that.data = undefined //给每个Promise对象指定用于存储结果数据的属性
//         that.callbacks = [] //每个元素结构：{onResolved(){},onRejected(){}}
//         function resolve(value) {
//             //在pending阶段才可以去改状态
//             if(that.status !== PENDING) {
//                 return
//             }
//             //改状态为resolved
//             that.status = RESOLVED
//             //存结果
//             that.data = value
//             //如果是先指定回调函数再改状态，就有待执行的callback函数，立即异步执行回调onResolved（放入异步回调队列）
//             if(that.callbacks.length > 0) {
//                 setTimeout(() => { //异步执行所有成功回调
//                     that.callbacks.forEach(callbacksobj => {
//                         callbacksobj.onResolved(value)
//                     })
//                 });
//             }
//         }
//         function reject(reason) {
//             if(that.status !== PENDING) {
//                 return
//             }
//             //改状态为rejected
//             that.status = REJECTED
//             //存结果
//             that.data = reason
//             //如果有待执行的callback函数，立即异步执行回调onRejected（放入异步回调队列）
//             if(that.callbacks.length > 0) {
//                 setTimeout(() => { //异步执行所有成功回调
//                     that.callbacks.forEach(callbacksobj => {
//                         callbacksobj.onRejected(reason)
//                     })
//                 });
//             }
//         }
//         //立即同步执行executor,如果执行器抛出异常promise变为rejected
//         try {
//             excutor(resolve,reject)
//         } catch (error) {
//             reject(error)
//         }
//     }
//     //在原型上我们经常用的方法：then，接收的参数是两个回调value=>{}和reason=>{}
//     //先同步执行then，then执行onResolved或者onRejected根据上一个Promise执行的结果决定。
//     //then()可以返回一个新的Promise，如果新的Promise执行resolve，下一个then就执行onResolved
//     Promise.prototype.then = function (onResolved,onRejected) {
//     //    //当前状态是pending状态，就把回调函数保存起来 
//     //    let that = this
//     //     //指定成功还是失败的回调
//     //     //返回一个新的Promise
//     //     return new Promise((resolve,reject) => {
//     //         //封装调用指定回调函数处理
//     //         function handle(callback) {
//     //             try {
//     //                 const result = callback(that.data)
//     //                 if(result instanceof Promise) {  //如果回调函数执行返回新的Promise，return的promise结果就是新的promise的结果
//     //                   result.then(value => resolve(value),reason =>reject(reason))
//     //                 } else {//如果回调函数执行返回非Promise，return的Promise就是成功的，返回值就是feiPromise的返回值
//     //                   resolve(result)
//     //                 }
//     //             } catch (error) {  //如果执行抛出异常新promise失败，reason就是error
//     //                 reject(error)
//     //             }
//     //         }

//     //         if(that.status === PENDING) {//如果当前是pending状态，把回调函数保存起来。
//     //             that.callbacks.push({
//     //                 onResolved(value) {
//     //                     handle(onResolved)
//     //                 },
//     //                 onRejected(reason){
//     //                     handle(onRejected)
//     //                 }
//     //             })
//     //        } else if(that.status === RESOLVED) { //如果当前是resolved的状态，异步执行onResolved，并修改return的Prmoise状态
//     //             setTimeout(() => { 
//     //               handle(onResolved)
//     //             });
//     //        }  else { //如果当前是reject的状态，异步执行onReject，修改return的Promise状态
//     //          setTimeout(() => { 
//     //             handle(onRejected)
//     //           });
//     //        }

//     //     })
//         let self = this
//         return new Promise((resolve,reject) => {
//             function handle(callback) {
//                 try {
//                     let result = callback(self.data) 
//                     if(result instanceof Promise) {
//                         result.then(value => resolve(value),reason => reject(reason))
//                     } else {
//                         resolve(result)
//                     }
//                  }  catch(error) {
//                      reject(error)
//                  }
//             }
//             if(self.status === PENDING) {
//                 self.callbacks.push({
//                     onResolved(value){handle(onResolved)},
//                     onRejected(reason){handle(onRejected)}
//                 })
//             } else if(self.status === RESOLVED) {
//                 setTimeout(() => {                
//                   handle(onResolved)
//                 });
//             } else {
//                 setTimeout(() => {
//                   handle(onRejected)
//                 });
//             }
//         })
//     }
//      //在原型上还有经常用的方法：catch，接收的参数是失败回调reason=>{}
//      Promise.prototype.catch = function (onRejected) {
//         //指定失败的回调
//         // 返回一个新的Promise
//     }
//     //Promise函数身上的方法有resolve，reject，all，race
//     Promise.resolve = function (value) {
//         //返回一个指定值为value的Promise
//     }
//     Promise.reject = function (reason) {
//         //返回一个指定reason的失败的Promise
//     }
//     Promise.all = function (promises) {
//         //返回一个Promise，只有所有Promise成功才成功，否则失败
//     }
//     Promise.race = function (promises) {
//         //返回一个Promise，结果由第一个完成的Promise决定
//     }
//     window.Promise = Promise //向外暴露Promise
// })(window)
/**
 * ES5定义模块：匿名函数自调用
 * ES6定义模块 module.export
 */
(function (params) {
    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'
    /**Promise的构造函数 */
    function Promise(executor) {
        let that = this
        that.status = PENDING
        that.data = undefined
        that.callBacks = []
        function resolve(value) {
            //该状态，存数据，将异步回调存入callbacks
            that.status = RESOLVED
            that.data = value
            if(that.callBacks.length > 0) {
                that.callBacks.forEach(callBacksobj => {
                    callBacksobj.onResolved(value)
                })
            }
        } 
        function reject(reason) {
            //该状态，存数据，将异步回调存入callbacks
            that.status = REJECTED
            that.data = reason
            if(that.callBacks.length > 0) {
                that.callBacks.forEach(callBacksobj => {
                    callBacksobj.onResolved(reason)
                })
            }
        }
        try {
            executor(resolve,reject)
        } catch (error) {
            reject(error)
        }
    }

    Promise.prototype.then = function (onResolved,onRejected) {
        //根据resolve或者reject选择成功或者失败
        let that = this
        that.callBacks.push({
            onResolved,
            onRejected
        })
        //返回一个新的Promise
        return new Promise((resolve,reject) => {
            // let result = 
            //非Promise
            // Promise
            //抛出异常
            try {
                if(result instanceof Promise) {
                    // 如果返回的是一个Promise调用
                    onResolved(result => {
                        value =>resolve(value),
                        reason=>reject(reason)
                    })
                } else {70
                    resolve(result)
                }
            } catch (error) {
                reject(result)
            }
        })
    }
    /**Promise原型的catch方法 */
    Promise.prototype.catch = function (onRejected) {
       
    }
    /**Promise函数对象的resolve方法 */
    Promise.resolve = function (value) {
      
    }
    /**Promise函数对象的reject方法 */
    Promise.reject = function (reason) {
        
    }
    /**Promise函数对象的all方法 */
    Promise.all = function (promises) {
       
    }
    /**Promise函数对象的race方法。返回一个新的Promise对象，由第一个完成的Promise决定 */
    Promise.race = function (promises) {
        
    }
    /**返回一个Promise对象，它在指定的时间之后才确定结果 */
    Promise.resolveDelay = function(value,time) {
        
    }
    /**返回一个Promise对象，它在指定的时间之后才失败 */
    Promise.rejectDelay = function(reason,time) {
        
    }
    window.Promise = Promise
})(window)