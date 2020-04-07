/**
 * 匿名函数自调用
 */
(function (params) {
    /**Promise的构造函数 */
    function Promise(exector) {
        this.status = 'pending'
        this.data = undefined
        this.callbacks = []

        function resolve(value) {
            if(this.status !== 'pending') {
                return
            }
            this.status = 'resolved'
            this.data = value
            if(this.callbacks.length > 0) {
                setTimeout(() => {
                    this.callbacks.forEach(callbackObj => {
                        callbackObj.onResolved(value)
                    })   
                });
            }
            try {
                exector(resolve,reject)
            } catch (error) {
                reject(error)
            }
        }
        function reject(reason) {
            if(this.status !== 'pending') {
                return
            }
            this.status = 'rejected'
            this.data = resolve
            if(this.callbacks.length > 0) {
                setTimeout(() => {
                    this.callbacks.forEach(callbackObj => {
                        callbackObj.onRejected(reason)
                    })   
                });
            }
        }
    }
    /**Promise原型的then方法 */
    Promise.prototype.then = function (onResolved,onRejected) {

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
    window.Promise = Promise
})(window)