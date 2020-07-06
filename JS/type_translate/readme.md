toString不能把对象转化为字符串
对象转字符串用JSON.stringify（）

Javascript对象有两个不同的方法执行对象转字符串，toString，valueOf
所有对象除了null和undefined都要toString方法
toString的方法在于返回一个反映这个对象的字符串。

object.prototype.toString会根据对象[[class]]属性返回由[object class]组成的字符串

数组调用toString，会返回把每个元素以，分割的字符串
函数的toString方法返回源代码字符串
RegExp的toString方法返回一个字面量的字符串

对象到字符串如何转换？其实就是ToString方法，
参数objext-->结果1：primValue=ToPrimitive（input，String）
            结果2：返回ToString(primValue)
    ToPrimitive就是输入一个值，返回一个一定是基本类型的值
    
    