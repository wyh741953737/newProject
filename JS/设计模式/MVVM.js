//如何实现数据1与视图1绑定
//1.需要知道那个数据改变了，vue中使用es5的数据对象访问属性，get，set
//我们需要知道，哪些地方用到了这个数据，当数据发生改变的时候通知他们：--》观察者模式
//观察者模式：消息中心发布一条信息，实现绑定过才可以监听
//修改视图

let data = {
    a: 1
}
let mgs = []
let watcher = []
Object.defineProperty(data, 'a', {
    get: function () {
        
    },
    set: function () {
        
    }
})
function watch(exp, fn) {
    target = fn
    data[exp]
}
