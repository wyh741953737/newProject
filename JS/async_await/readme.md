async函数：函数返回值为Promise对象，promise对象的结果由async函数执行的返回值决定

await表达式：await返回的就是promise成功的值。右侧一般为promise对象，也可以是其他值，如果是promise对象
如果await的promise失败了，就会抛出异常，需要用try...catch捕获异常。
await只能得到成功的结果，要得到失败的，就try  catch
try{
    const value = await fn()
} catch (error) {}
async特点：
1：语义化强
2：里面的await只能在async函数中使用
3：await后面的语句可以是promise对象、数字、字符串等
4：async函数返回的是一个Promsie对象


generator是一个迭代器生成函数，返回值是一个迭代器（iterator对象），ES6提供的一种异步编程的方案
generator是一个状态机，封装了多个内部状态，