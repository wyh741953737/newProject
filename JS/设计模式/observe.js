let msgContainer = (function () { 
    let _msg = {}
    return {
        //订阅消息
        register: function (type, fn) {
            if (_msg[type]) {
                _msg[type].push(fn)
            } else {
                _msg[type] = [fn]
            }
        },
        //发布消息
        public: function (type, args) {
            if (!_msg[type]) {
                return
            }
            let event = {
                type: type,
                args: args || {}
            }
            for (let i = 0; i < _msg[type].length; i++) {
                _msg[type][i][args]
            }
        },
        //取消订阅
        cancel: function (type, fn) {
            if (!_msg[type]) {
                return 
            }
            for (let i = 0; i < _msg[type].length; i++) {
                if (_msg[type][i] === fn) {
                    _msg[type].splice(i, 1)
                    break
                }
            }
        }
    }
})()
function Person() {
    this.readyRegister = {}
}
Person.prototype.register = function (type, fn) {
    if (this.readyRegister[type]) {
        console.log('你已经订阅给，不要重复订阅')
    }
    msgContainer.register(type, fn)
    this.readyRegister[type] = fn
}
Person.prototype.cancel = function (type) {
    msgContainer.cancel(type, this.readyRegister[type])
    delete this.readyRegister[type]
}
let p1 = new Person()
let p2 = new Person()
let p3 = new Person()
p1.register('carInfo', function (e) {
    console.log('p1得到了关于'+e.type+'的消息，消息内容是：'+ e.args.info)
})
p1.register('manInfo', function (e) {
    console.log('p1得到了关于'+e.type+'的消息，消息内容是：'+ e.args.info)
} )
p2.register('carInfo', function (e) {
    console.log('p2得到了关于'+e.type+'的消息，消息内容是：'+ e.args.info)
})
p3.register('news', function (e) {
    console.log('p3得到了关于'+e.type+'的消息，消息内容是：'+ e.args.info)
})

msgContainer.public('carInfo', { info: '奔驰新款上市了' })
msgContainer.public('news', { info: '国家主席到，。参观' })
