浏览器
    渲染引擎：解析html/css，俗称内核
    JS引擎：读取并处理js代码
JS组成：
    DOM：文档对象模型
    BOM：浏览器对象模型
    ECMAScript：由ECMA国际进行标准化的一门语言。
数字型特殊值：infinity无穷大，-infinity负无穷大，NaN

     字面量，都是一些不可改变的量，如1，2，3
     变量，变量可以保存字面量，变量值任意改变
     标识符：在JS中所有可以由我们自主命名的都可以是标识符，如：变量名，函数名，属性名
     标识符不能以数字开头
     强制类型转换
        一：将其他数据类型转换成String
           1，调用被转换数据类型的toString()方法，该方法不会影响原值，他会将转换的结果返回
              *null和undefined没有toString方法，调用的话会报错
           2，调用String()函数，将要被转换的作为参数传给String函数
              *使用String()函数强制转换，对number和boolean实际上就是调用toString()方法
              但是对null和undefined就不会调用toString()方法
              他会将null直接转化为"null",undefined直接转化为"undefined"(将字面量转化为字符串)
        二：将其他数据类型转化为Number
           1，使用Number()函数
             字符串转数字（若是纯数字转为数字，非数字转为NaN，空串、空格转为0，布尔值为true转1，false转0，null0，undefined转NaN。
           2，这种方式专门用来对付字符串
              parseInt()函数将第一个字符串转化为整数（将字符串中有效整数取出来转化为Number，只会取整数，没有数字得到NaN，
                      比如123px我们想得到123，这个时候使用parseInt可以实现，Number函数只会得到NaN）
              parseFloat()可以获取有效小数
         如果对非String使用parseInt或者parseFloat，它会先将其转化为String，然后操作
         在js中需要表示16进制数字需要以0x开头 8进制以0开头  2进制以0b开头（不是所有浏览器支持）
         使用parseInt进行转化时，比如a="070",a=parseInt(a)//70或者58，
         像070这种字符串，有些浏览器会当成8进制，有些会当成10进制，为了解决这个问题，在parseInt中传递第二个参数来指定进制
       三：将其他数据类型转化为Boolean
        1，使用Boolean()函数
           * 数字转为boolean除了0和NaN，其余都是true（正负数，Infinity）
           * 字符串转boolean除了空串，其余都是true
           * null和undefined转为boolean 都是false
           *对象也为true
    运算符也叫操作符
       比如typeof，它会将该类型以字符串的形式返回
       算数运算符：对非Number进行运算时会将其先转为Number再运算如true+1=2，2+null=2
                任何值和NaN做运算都是NaN  2+NaN=NaN
                任何值和字符串做加减都会先转为字符串再拼串（我们可以利用这一特点，将任意的数据类型
                转为String（任意数据类型+""空串)一种隐士转换，浏览器自动转化，实际也是调用String())
                "1"+2+3=123  1+2+"3"="33"
                100-"1"=99
                2*"8"=16
                2*undefined=NaN(任何值和非Number都会转为NaN)
                2*null=0
                任何值做-，*，/运算都会自动转为number，利用这点做隐式转化，为一个值-0，*1，/1将其转为number
   一元运算符：只需要一个操作符
    +正号不会对数字产生影响
    -负号对数字进行符号取反
    对非Number类型的值会先转化为number再运算可以对其他数据类型使用+，将其转化为number、，原理和Number一样
    比如1+“2”+3=“123”
        1++“2”+3=33
++
a++后加，先参与运算，然后变量自增，在下次参与运算时会改变
++a，先自增，再参与运算
使用typeof检测null，unddefined都返回object，
无论a++还是++a都会立即使原变量自增1.不同的是值不同。a++的值等于原变量的值，++a是自增后的值（a和a++不一样，a是变量，a++是表达式）
var c=10
c++
console.log(c++)//11
var a=20
var b=a++ + ++a +a //20+22+22=64
var e=20
f=e++
console.log(f,e)//20 21

三种逻辑运算符
与&& 运算规则：两个值中只要有一个为false就返回false，两个都为true才返回true
或|| 两个值中有一个为true就会返回true，两个都是false才返回false，如果第一个是true就不会看第二个。
非！对非布尔值取反，会将值转化为布尔值再进行运算，利用该特点可以将其他类型转化为布尔值，取两次反转化为布尔值，原理和Boolean一样
&& || 非布尔值情况：运算时会将其转化为布尔值再运算，并且返回原值
true && true 与运算两个值都为true则返回后边的
与运算：如果第一个为true，则必然返回第二个，如果第一个为false，则返回第一个
或运算：如果第一个为true，则必然返回第一个，如果第一个为false，则返回第二个
比较运算符：任何值和NaN作比较都是false。如果符号两边都是字符串，不会直接转化为数字比较，会比较uniCode编码，比如："11"<"5"//true，"a"<"b"//true "abc"<"b"//一位一位比较
如果两位一样则比较下一位，借用它来对英文字母进行排序
比较两个字符串型数字时候，一定要转型比如限制购物车商品数量，是字符串，要转型
在js中：字符串中使用转义字符输入编码\u四位编码 console.log("\u2620")
在网页中：使用编码 &#编码 这里的编码，需要的是10进制 
== 类型不相等时会进行类型转化再比较（大多时候转化为数字）
undefined衍生自null，做相等判断时会返回true。NaN不和任何值相等包括它本身.通过isNaN()函数来判断一个值是否是NaN
=== 要求值和类型都相等 与==不同，===不会进行类型转换
！==不全等，不进行类型转换
运算符优先级：不确定优先级的用()来改变优先级
获取水仙花数如：1^3+5^3+3^3=153
for(var i=100;i<1000;i++){
   var bai=parseInt(i/100);
   var shi=parseInt((i-bai*100)/10)
   var ge=i%10
}
99乘法表
for(var i=1;i<=9;i++){
   for(var j=1;j<=i;j++){
      document.write(j+"*"+i+"="+i*j+"&nbsp;&nbsp;")
   }
   document.write("<br/>")
}

break中止当前循环，默认只会对离它最近的循环起作用，如果希望中止外界循环，可以给循环娶个名字，
label:循环语句，使用break语句时可以在break后跟一个label，这样break可以结束一个指定的循环，而不是最近的
比如：
outer：
for(var i=0;i<10;i++){
   console.log(i)
   for(var j=0;j<10;j++)
   {
      break outer;
      console.log(j)
   }
}
continue跳过当次循环，继续执行下次。默认只会对离它最近的循环起作用，也可以使用label：循环语句
作用：比如筛选质数，提高性能
for(var i=2;i<100;i++){
   for(var j=2;j<i;j++){
      if(i%j==0){//如果进入判断表明i不是质数

      }
   }
}
打印出2-100之间所有质数（除了1和它本身不能被其他整除的数）
console.time("test")开启一个计时器，放代码开头
for(var i=2;i<100;i++){
   for(var j=2;j<=Math.sqrt(i);j++){
      if(i%j==0){//如果进入判断表明i不是质数
         //此时循环没有意义，使用break来结束循环
         break；//
      }
   }
}
console.timeEnd("test")终止计时器，放代码结尾


对象：
内建对象：由ES标准定义的对象，在任何ES的实现中都可以使用，比如：Math，String，Boolean，Function
宿主对象：js的运行环境提供的对象，目前来讲主要由浏览器提供的比如：DOM，BOM
自定义对象：开发者自定义的对象
创建对象：使用对象字面量来创建对象 var obj={} obj.name="ff"
         
js中变量都存在栈内存中，基本数据类型的值直接在栈内存中存储，值与值之间独立，对象是保存到堆内存中
var obj=new Object()

obj.name="dd"
var obj2=obj
obj.name="ff"
变量    值         
obj2   0x22
obj    0x22
当比较基本数据类型时就是比较值
当比较引用类型时比较的是地址，

函数也是一个对象
创建函数：
 构造函数创建一个函数，var fun=new Function()
 声明式创建函数 function 函数名（）{}
 表达式创建函数 var fun2=function (){}
实参和形参之间的关系：实参少于形参，没有对应实参的形参为undefined，实参可以是任意类型，可是对象或者函数

形参有很多的时候，将参数放在一个对象里，作为实参传给函数
作用域：一个变量的作用范围。
   全局作用域：在页面打开时创建，页面关闭时销毁，全局作用域中有一个全局对象window，由浏览器创建可以直接使用。
      在全局作用域中创建的变量会作为window对象的属性保存，在全局作用域中创建的函数会作为window的方法保存

   函数作用域：在函数执行
变量的声明提前：使用var关键字声明的变量会在所有代码执行之前被声明但不会被赋值
函数声明提前：使用函数声明形式创建的函数，会在所有代码执行之前被创建，使用函数表达式创建的函数在函数声明之前调用会报错

fun() //在函数声明之前被调用，没有报错，执行了，无论写在任何地方都可以执行
fun2()//报错，var fun2，声明了但是没有赋值，undefined
function fun(){
   console.log("我是fun函数")
}
var fun2=function(){
   console.log("我是fun2函数")
}

解析器在调用函数每次都会向函数内部传递一个隐含的参数this，this指向一个对象，这个对象我们称为函数执行上下文对象，
根据函数调用方式不同，this指向不同
1，以函数形式调用，this指向window
2，以方法形式调用，this指向该对象

创建对象：
1，使用工厂模式创建对象，该方法可以大批量创建对象。
function Person(name,age,gender){
   this.name=name;
   this.age=age;
   this.gender=gender;
   this.sayName=function(){
      alert(this.name)
   }
}
var p2=new Person('a',12,'man')
var p3=new Person('b',10,;mon)


原型prototype，我们创建的每个函数，解析器都会向函数添加一个属性prototype，默认指向一个Object空对象（即原型对象）
原型对象中有一个属性constructor，它指向函数对象 fun.prototype.constructor===fun  Date.prototype.constructor===Date 构造函数和原型对象相互引用
如果函数作为普通函数 调用，prototype没有任何作用，当函数通过构造函数被调用时，它所创建的对象中都会有一个隐含属性，指向该构造函数的原型对象，可以通过——proto——访问
原型对象就像公共区域，所有同一个类的实例都可以访问到这个原型对象
以后我们创建构造函数时，可以将一些共有的属性和方法，统一添加到构造函数的原型中，这样不用分别为每个对象添加，也不会影响到全局作用域，就可以使每个对象都具有这些属性和方法了
hasOwnPrototype检查对象自身中是否含有该属性，自由对象自身中有才返回true
原型对象也有原型 原型的原型就不再有原型了（直到Object对象的原型，如果找个属性一直找还找不到就返回undefined
当我们直接在页面中打印一个对象时，实际上就是输出对象的toString（）方法的返回值[oject object]
如果不希望在输出对象时不输出[object object]，可以为对象添加toString()方法

每个函数都有一个prototype，即显示原型（属性）
每个实例对象都有一个__proto__，可称为隐式原型（属性）
*对象的隐式原型的值对应着构造函数的显示原型的值 Fn.prototype===fn.prototype

函数的prototype是在定义函数时自动添加的
对象的__proto__是在创建对象的时自动添加的
ES6之前程序员能直接操作显示原型，但是不能操作隐式原型  


判断数据类型：
typeof 返回数据类型的字符串表达，声明一个变量未定义，typeof返回'undefined' 数字/字符串/布尔值/undefined/function。不能判断null与Object，Object和Array
var a=function (){} //typeof a （'function'）


instancef 判断对象的具体类型
===/== null/undefined

undefined 定义了未赋值
null 定义了，赋值为null    什么时候赋值为null：1：初始值表明对象。2：将对象成为垃圾对象
var b=null //初始值为null，表明将要赋值为对象
b=["dd",12]//确定对象就赋值
b=null //让b指向的对象成为垃圾对象
         
数据类型：基本类型，对象类型
变量类型：基本类型，引用类型

数据：存储在内存中代表特定信息的，本质上是0101，特点：可读和可传递
内存：内存条通电后产生的可存储数据的空间。一小块内存的两个数据：内部存储的数据，地址值，内存分类：堆（对象）/栈（全局变量/局部变量）
变量：可变化的量，由变量名变量值组成，每个变量对应一小块内存，变量名用来查找对应的内存，变量值就是内存中存储的数据
数据，内存，变量之间关系：内存用来存储数据的空间，变量是内存的标识

引用变量赋值问题：
var obj1={name:'tom'}
var obj2=obj1
function fn(obj){
   obj.name='A'
}
fn(obj1)
console.log(obj2.name) //A

多个引用变量指向同一个对象，通过一个变量修改对象内部数据，另一个变量看到的是修改后的数据
多个引用变量指向同一个对象，让其中一个引用变量指向另一个对象，另一个引用变量依然指向前一个对象
var a={age:12}
var b=a
a={name:'A',age:13}
console.log(b.age,a.name,a.age) //12 A 13
function fn2(obj){
   obj={age:15}
}
fn2(a)
console.log(a.age)//13

在js调用函数时传递变量参数时，是值传递还是引用传递？
理解1：都是值（基本/地址值）传递
理解2：可能是值传递，也可能是引用传递
JS引擎如何让管理空间？
1，内存生命周期：分配内存空间，得到使用权，存储数据可以反复操作，释放小内存空间
2，释放内存：局部变量：函数执行完自动释放，对象：成为垃圾对象-》立即回收机制回收
var a=3
function fn(a){
   a=a+1
}
fn(a)
console.log(a)//3

什么是对象？
多个数据的封装体，用来保存多个数据的容器，一个对象代表现实中的一个事物
为什么要用对象？
统一管理多个数据

什么是函数？
为什么要用函数？
提高代码复用，便于阅读和交流
如何定义函数？
声明式，函数表达式，构造函数
如何调用/执行函数？
test（）直接调用
obj.test()
new test()new调用
call，apply
什么是回调函数？
1：你定义的。2：你没有调，但是最后执行了
常见的回调函数？
dom事件回调函数
定时器回调
ajax请求回调函数
生命周期回调

IIFE立即执行函数作用？
隐藏实现，不会污染外部（全局）命名空间

实例对象：new函数产生的对象
函数对象：将函数作为对象时使用


同步回调：立即执行，完全执行完才结束，不会放入回调队列中
异步回调：不会立即执行，放入回调队列之后执行，ajax，定时器，promise的成功|失败回调

错误类型：Error
ReferenceError：引用错误
SynaxError：语法错误
RangeError：数据值不在其允许范围
TypeError：类型错误
错误处理：
  捕获错误： try...catch
  抛出错误： throw Error
错误对象：message错误信息，stack函数调用栈信息










Socket.io
   http协议实现通信，只能浏览器发起，服务器不能像浏览器发请求，不平等（浏览器进攻）
   h5 websocket可以实现客户端和服务器端双向通信。
   轮循：服务器无法主动发信息给客户端，客户端就要不断的去问服务器有没有数据。
   socketio包装的是h5 websocket和轮循。教新的浏览器内部使用websocket，不支持的内部就会采用轮循


React中为什么一定要在constructor中调用super？
super是一个函数，而且它是父类的构造器，子类中的super其实就是父类中constructor构造器的一个引用，
如果一个子类通过extends关键字继承了父类，那么子类的constructor中必须优先调用以下super



Hook钩子，函数，你可以在不使用class情况下使用state，或者生命周期，hook从组件中提取状态逻辑，使这些逻辑可以单独测试和复用
复用状态逻辑。hook不能在class组件中使用
hook将组件中互相关联的部分拆分为更小的函数
useState返回一对值：当前状态和一个更新状态的函数
useEffect，操作副作用，与componentDidMount，Didactic？Update，willUnMount用途一样
通过useEffect你可以将订阅/取消订阅等副作用组织在一起，而不需要拆分到不同生命周期里。
副作用操作：数据获取，操作DOM，订阅
useEffect告诉react，Dom更改后运行副作用函数，副作用函数在组件内声明的，所以可以访问到state，props
React会在每次渲染后调用副作用函数，副作用函数可以通过返回一个函数来清除副作用

重用状态逻辑：2个方法：高阶组件，render props，hook也可以在不增加组件条件下达到目的
不同组件复用状态逻辑，state相互独立，不复用state本身

useState方法做了什么？定义一个state变量count，和class中的this.setState作用一样
useState方法里唯一参数就是初始state
useState返回值：当前state以及改变state的函数
在class中通过this.state.count读取，useState中直接读取count
const [count,setCount] = useState(count)
用[]，数组解构，意味着同时创建count，setCount两个变量

如果只是想在更新DOM之后运行部分代码，如：网络请求，手动更新DOM，等无需清除的操作

冒泡排序：一组数据，两个两个进行比较，如果位置错误交换位置，直到没有需要交换的数据
   比如有5个数据[5,3,7,1,2] 一共要走length-1趟，每一趟交换length-i-1次。


