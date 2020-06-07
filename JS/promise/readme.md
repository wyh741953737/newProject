excutor函数：执行器：(resolve,reject) => {}
excutor会在Promise内部立即同步回调，异步操作在执行器中执行,执行器函数同步回调。
     
回调地狱方案
     dosomething(function(result) {
         dosomething(result,function(newResult) {
             domething(newResult,function(finalResult) {
                 console.log(finalResult)
             },failureCallback)
         },failureCallback)
     },failureCallback)

promise方案
     dosomething.then(function(result) {
         return dosecondthing(result)
     }).then(function(newResult) {
         return dothiredthing(newResult)
     }).then(function(finalResult) {
         console.log(finalResult)
     }).catch(failureCallback)

async/await
     async function request() {
         try{
             const result = await dosomething()
             const newresult = await dosecondthing(result)
             const finalresult =await dothiredthing(newResult)
              console.log(finalResult)
         } catch (error) {
             failureCallback(error)
         }
     }

改变promise的状态和指定回调函数谁先谁后？
  都有可能。构造器同步执行，.then是指定回调函数的，then里面的回调函数是异步的
        new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve(1)
            }, 1000);
        }).then( //先指定回调后该状态
            value => { console.log(value)},
            reason => { console.log(reason)}

        )
        new Promise((resolve,reject) => {
            resolve(1)
        }).then( //先改状态后指定回调
            value => { console.log(value)},
            reason => { console.log(reason)}
        )
        Promise是什么？
抽象表达：是js中进行异步编程的新方案（旧的是纯函数回调）
具体表达：从语法上来说Promise是个构造函数。从功能上来说，promise对象用来封装一个异步操作并可以获取其结果。
pending：不确定的。promise只能变为rejected，或者resolved，只能变一次。

为什么使用Promise? 
**********************
（1）指定回调函数的方式更加灵活：
   纯函数：必须在启动异步任务之前指定
   Promise：启动异步任务=>返回promise对象，给promise对象绑定回调函数
            可以在异步任务启动之前或者之后，甚至得到结果之后再指定回调函数
（2）支持链式调用，可以解决回调地狱
    什么是回调地狱？回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调函数执行的条件
         第一个异步任务的结果作为第二个异步任务的条件，第三个异步任务的结果作为第二个异步任务的条件，一个异步任务要指定一个回调函数
         回调函数接受成功的结果第二个回调函数也要指定一个成功的回调和一个失败的回调，成功的回调接收到一个新的结果。
         这种代码特别不方便阅读，异常处理也比较麻烦
    回调地狱缺点？不便于阅读/不便于异常处理
    解决办法？promise链式调用
    终极解决方案？async/await

执行器函数是同步回调，执行器执行完，new promise函数才结束，promise对象产生之后内部的异步任务启动了，可能还没完成
**************************
promise构造函数 promise(excutor){}
Promise.prototype.then()
Promise.prototype.catch()
Promise.resolve()
Promise.reject()
Promise.all()
Promise.race() 返回一个新promise，第一个完成的promise的结果状态就是最终的结果状态

如何改变Promise状态？
 1：resolv(value)
 2:reject(reason)
 3:抛出异常:rejected。可以抛出new Error(''),也可以抛出3（数字）等任何东西


改变promise状态和指定回调函数谁先谁后？
都有可能，常规先指定后改变状态
如何先改状态再指定回调函数？
1：在执行器中直接调用resolve()/reject()
2:延迟更长的时间才调用then()
什么时候才能得到数据？
1：如果先指定回调，当状态发生改变，回调函数就会被调用，得到数据
new Promise((resolve,reject) =>{
   setTimeout(()=>{
      resolve(1) //后改变状态（同时指定数据），然后异步执行回调函数
   })
}).then( //先指定回调，保存当前指定的回调函数
    value=>{},reason=>{} //这两个是回调函数，
    )
2：如果先改变状态，那当指定回调时，回调函数就会被调用，得到数据
（1）：
new Promise((resolve,reject) =>{
      resolve(1) //先改变状态（同时指定数据） （同步执行，因为整个res
      olve,reject（执行器）函数是同步的）
}).then( //后指定回调，异步执行回调函数。
//.then也是同步的，.then和回调函数不是一回事，.then是去指定回调函数的，同步改的状态，同步指定的回调函数，执行回调函数的条件就有了)
    value=>{},reason=>{} //这两个是回调函数，异步的。即使条件已经满足也不是立即执行的
    )
同步操作直接在then里面return，异步操作return一个新的Promise（promise封装异步操作）。
promise.then()返回的新promise的结果由什么决定？
（1）简单表达：由then（）指定和回调函数的结果决定
（2）详细
   1：如果抛出异常，新promise变为rejected，reason为抛出的异常
   2：如果返回的是非promise的任意值，新promise变为resolved，value为返回值
   3：如果返回的是另一个新的promise，此promise的结果就会成为新promise的结果

promise异常穿透？
（1）当使用promise的then链式调用时，可以在最后指定失败的回调函数
（2）前面任何操作出现异常，都会传到最后失败的回调中处理
new Promise((resolve,reject) => {
   resolve(1)
}).then(
   value =>{},
 //默认写法  reason =>{ throw reason} //箭头也有return作用
).then(
   value =>{},
 //默认写法  reason =>{ throw reason} //箭头也有return作用 也可以这样写 reason => Promise.reject(reason)
).catch(reason =>{

})
中断promise链？
在回调函数中返回一个pending状态的promise   即：return new Promise(()=>{})