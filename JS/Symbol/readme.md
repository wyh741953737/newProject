Symbol是ES6引入的一种新的基础数据类型，功能类似于一种标识唯一的id
我们可以通过调用Symbol函数来创建一个Symbol实例，不能用new，因为symbol是一个原始类型值，不是对象
let s1 = Symbol()
使用typeof检测Symbol返回symbol
每个Symbol实例都是唯一的，
    let s1 = Symbol()
    let s2 = Symbol()
    s1 === s2 //false
    
Symbol使用场景：使用Symbol来定义的对象属性名（key）
Symbol定义常量
Symbol来设置class里面的私有属性

如果 Symbol 的参数是一个对象，就会调用该对象的 toString 方法，将其转为字符串，然后才生成一个 Symbol 值。
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
console.log(sym); // Symbol(abc)

Symbol 函数的参数只是表示对当前 Symbol 值的描述，相同参数的 Symbol 函数的返回值是不相等的。