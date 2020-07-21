### axios和Axios的关系：
从语法上来说，axios不是Axios的实例
从功能上来说，axios是Axios的实例
axios是Axios.prototype.request函数bind()返回的函数
axios作为对象有Axios原型对象上的所有方法和属性
### instance和axios的区别
相同：
1）都是一个能发任意请求的函数，request(config)
2) 都有发特定请求的各种方法，get，post，put，delete
3）都有默认配置和拦截器的属性，defaultes/interceptors
不同
1）默认匹配不一样
2）instance没有axios添加的一些方法，create/CancelToken/all
