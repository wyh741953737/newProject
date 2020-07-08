//委托模式：当多个对象需要处理同一个请求时，将这些请求交由另一个对象处理,通过事件冒泡来实现
// window.onload = function () {
//     let arrList = document.getElementsByTagName('li')
//     for (let i = 0; i < arrList.length; i++) {
//         (function () {
//             arrList[i].onclick = function () {
//                 console.log(i)
//             }
//         })()
//     }
// }

let oUl = document.querySelector('ul')
oUl.onclick = function (e) {
    let e = e || window.event
    let target = e.target || e.srcElement
    if (target.nodeName.toLowserCase() === 'li') {
        {
        console.log(target.innerHTML)
    }}
}