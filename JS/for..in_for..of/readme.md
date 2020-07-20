
for in遍历数组毛病：    
    1：index索引为字符串型数字，不能进行几何运算
    2：遍历顺序有可能不是按实际数组内部顺序
    3：使用for。。in 会遍历数组所有可枚举属性，包括原型，for..in更适合遍历对象，不要使用forin遍历数组
    4：for in遍历的是数组索引

for of
    1:for of遍历数组的元素值
    2：for of适合遍历数组/字符串/map/set等实现迭代器接口的对象，不能遍历对象，因为没有迭代器对象
    3：和forEach不同的是，它可以正确响应break，continue，return语句

一个数据结构只要部署了 Symbol.iterator 属性, 就被视为具有 iterator接口, 就可以使用 for of循环。
for of循环首先调用集合的Symbol.iterator方法，紧接着返回一个新的迭代器对象，迭代器对象可以是任意具有.next()方法的对象，for of循环重复调用这个方法，


哪些数据结构部署了 Symbol.iteratoer属性了呢?

数组 Array
Map
Set
String
arguments对象
Nodelist对象, 就是获取的dom列表集合
以上这些都可以直接使用 for of 循环。 凡是部署了 iterator 接口的数据结构也都可以使用数组的 扩展运算符(…)、和解构赋值等操作。

ES5具有遍历数组的功能：
map，
forEach 不能通过break中断，也不能通过return返回外层函数
filter，
some，
every，
reduce，

