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