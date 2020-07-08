//等待者模式：通过多个异步进程的监听，对为了事件进行统一管理
//n个异步事件，期望前面两个处理完了再了处理3，4，5.或者想全部完成处理其他。promise，async，await
//es6之前，异步管理对象通过等待者模式实现

//waiter.when(异步1，2.。。).done(fn).fail(fn)
function Waiter() {
    let dfd = [] //存放异步事件
    let doneArr = [] //存放成功的回调
    let failArr = []
    this.when = function () {
        dfd = Array.prototype.slice.call(arguments)
        for (let i = dfd.length - 1; i >= 0; i--) {
            let d = dfd[i]
            if (d || d.reject || d.resolve || d instanceof Defer)  {
                
            }
        }
    }
    this.done = function () {
        
    }
    this.fail = function () {
        
    }
    this.Defered = function () {
        return new Defer()
    }
    let Defer = function () {
        this.resolve = false
        this.reject = false
    }
    Defer.prototype = {
        resolve: function () {
            this.resolve = true
            for (let i = 0; i < dfd.length; i++) {
                if (!dfd[i].resolve) {
                    return
                }
            }
        },
        reject: function () {
            this.reject = true
        }
    }
}
let waiter = new Waiter()
let async1 = function () {
    let dfd = waiter.Defered()
    setTimeout(() => {
        console.log('asawait done')
        dfd.resolve()
    }, 1000);
    return dfd
}
let async2 = function () {
    let dfd = waiter.Defered()
    setTimeout(() => {
        console.log('async2 done')
        dfd.resolve()
    }, 1000);
}
waiter.when(async1(), async2()).done(function () {
    console.log('success')
}).fail(function () {
    
})