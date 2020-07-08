//中介模式，通过中介，其他相关对象都通过该中介来通信，而不是相互引用，当其中一个对象发生改变，只需要通知中介，中介解除了对象之间耦合
//中介适用场景：购物车需求，存在商品选择表单，颜色选择表单，购买数量表单等，都会触发change事件，可以通过中介转发这些事件
let goods = {
    'red|32G': 3,
    'red|64G': 1,
    'blue|32G': 7,
    'blue|64G':3
}
let mediator = (function () {
    let colorSelect = document.getElementById('colorSelect')
    let memorySelect = document.getElementById('memorySelect')
    let numSelect = document.getElementById('numSelect')
    return {
        changed: function (obj) {
            switch (obj) {
                case colorSelect:
                    break
                case memorySelect:
                    break
                case numSelect:
                    break
            }
        }
    }
})()
colorSelect.onCahnge = function () {
    mediator.changed(this)
}
memorySelect.onCahnge = function () {
    mediator.changed(this)
}
numSelect.onCahnge = function () {
    mediator.changed(this)
}