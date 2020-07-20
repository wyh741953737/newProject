
### 什么是闭包
* 在javascript高级程序设计中的定义：闭包是指有权访问另一个函数作用域中变量的函数。
* 函数作用域和函数执行的作用域不在同一作用域就是闭包。
* 闭包是连接函数内部和函数外部的桥梁，函数外部可以访问到函数内部的变量（比如：函数作为另一个函数的返回值）
* 闭包的实现主要思路是返回一个函数，所以闭包是典型的高阶函数。
### 闭包产生的条件
* 函数嵌套
* 内部函数引用了外部函数的变量<br/>
### 闭包的生命周期
* 产生：在嵌套内部函数定义执行完的时候闭包就产生了，过程如下：
* 死亡：嵌套在内部函数的对象成为垃圾对象时就死亡了。
### 闭包的应用
* 让函数外部访问私有变量
特权方法：有权访问私有变量（局部的变量、函数的参数或者函数内部定义的其他函数）和私有方法的方法
```
function Pay(value) { //Pay是一个闭包
        let money = value
        this.getMoney = function() {
            return money
        }
        this.setMoney = function(value) {
            money = value
        }
}
let pay = new Pay(8000)
console.log(pay.money) //undefined 在外面无法访问到私有变量money
console.log(pay.getMoney()) //8000 //getMoney这个特权方法可以通过对象访问，getMoney可以访问money
pay.setMoney(10000)
console.log(pay.getMoney()) //1000
```
* （和上面的类似）定义JS模块，将所有的数据和功能都封装在一个函数内部（私有的），只向外暴露一个包含n个方法的对象或者函数。

```
function myModule() {
     let msg = 'hello world' //私有数据
     function doSomething() { //操作数据的函数
         console.log('dosomething'+msg.toUpperCase())
     }
     function doOtherthing() {
         console.log('doOtherthing'+msg.toLocaleLowerCase())
     }
     return{
        doSomething:doSomething,
        doOtherthing:doOtherthing
     }
}
//模块的使用者
let module = myModule()
module.doSomething()
module.doOtherthing()
```

* 每个1秒输出对应li的索引号（利用for循环创建立即执行函数）

```
for(var i=0;i<lis.length;i++) {
        (function(i) {
            setTimeout(() => {
                alert(i)
            }, 1000);
        })(i)
}
```
* 局部作用计数器
```
function count() {
    let num = 0
    return function() { //函数作为返回值
        num++
        return num
    }
}
let fn = count()
fn() //1
```
### 闭包优点
* 延伸了变量的作用范围和生命周期
* 避免全局变量的污染

### 闭包缺点
*  一般函数的作用域和函数中的变量都会在函数执行结束被垃圾回收机制回收。由于闭包中的变量在外层函数被调用之后不会被自动清除，所以闭包使用不当容易造成内存泄漏。为了防止内存泄漏，我们需要将不再使用的变量通过手动释放。能不用闭包就不用。
   
##### 内存溢出：是一种程序运行出现的错误，当出现运行需要的内存超过了剩余的内存时，就抛出内存溢出的错误。
##### 内存泄漏：占用的内存没有及时释放，内存泄漏积累多了就容易导致内存溢出。常见的内存泄漏：闭包、意外的全局变量（函数中没有用var|let|const声明的变量）、没有及时清理的计时器或回调函数。
    
```
function demo() {
    let name = 'Eileen'
    console.log('name')
}
demo() //demo函数执行完，demo函数的作用域没有被外部引用，则该函数的作用域及其变量都会在函数执行完后被销毁
```

```
function foo() {
    let name = 'Eileen'
    return function() {
        name = 'John'
        return name
    }
}
let fn = foo() 
console.log(fn()
fn = null //在全局作用域中执行fn函数，fn函数的环境依赖于foo函数环境，所以foo函数内的作用域及其变量不会被销毁。fn = null释放对闭包的引用，foo函数作用域被销毁
```
*  使用闭包之后，可以访问到函数内部的私有变量，通过特权方法可以随意更改私有变量。

### 最后再来一道面试题吧！
```
function fun(n,o) {
    console.log(o)
    return {
        fun: function(m) { 
            return fun(m,n)
        }
    }
}
var a = fun(0) //undefined
    a.fun(1)   //0
    a.fun(2)   //0
    a.fun(3)   //0
var b = fun(0).fun(1).fun(2).fun(3)   //undefined,0,1,2
var c = fun(0).fun(1)   //undefined,0
    c.fun(2)   //1
    c.fun(3)   //1
```
