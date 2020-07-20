一、声明变量：
   1： let 声明变量，没有变量提升，有块级作用域，防止数据污染（用let声明了一个变量之后再次声明同名变量会报错，必须先声明再使用
   2： const 声明常量，必须先赋值，不能重新赋值（值不可更改，Array内部值可以改，内存地址不可改）和声明，有块级作用域。

    let关键字暂时性死区：在一个作用域里先使用一个和外部同名的变量（块级作用域的变量和外界同名变量没关系，然后再声明这个变量会报错
    var temp = 123
    if(true){
        temp = 'abc' //不会像上级查找，报错
        let temp
    }

    -----------
    var a = []
    for(var i=0 i<10;i++) {
        a[i].onclick = function() {
            console.log(i) //一直是10,i是全局的，函数执行输出是全局作用域下的值，i已经是10了
        }
    }
    使用闭包：
    for(var i=0 i<10;i++) {
        a[i].onclick = (function(index) {
            console.log(index) //1,2,3,4,5,6,7,8,9
        })(i)
    }
    有了let之后，
    for(let i=0 i<10;i++) {
        a[i].onclick = function() {
            console.log(i) //1,2,3,4,5,6,7,8,9，这个作用域中没有i，向上级作用域找，let声明的变量有块级作用域
        }
    }


二、变量的解构赋值
    解构：通过数组或者对象的方式，对一组变量进行赋值,
    对象解构和数组解构：对象解构没有顺序，是根据键来取值的，数组的元素是按顺序，变量取值由它的位置决定
    比如原始：let a=1,b=2,c=3
    用解构赋值：let [a,b,c] = [1,2,3]
    解构赋值使用默认值: let [a,b,c=3] = [1,2]
                      let [a,b,c=3] = [1,2,4] //[1,2,4]
                      let [a,b,c=3] = [1,2,undefined] //[1,2,3]
    对象解构赋值：
        var user = {
            name:'Eila',
            age:12
        }
        var name = user.name
        var age = user.age
    解构赋值： var { name,age } = user
    解构圆括号的使用：如果变量在解构之前就定义了，这时候去解构就会报错
        let a='你好'
        { a } = {a:'我好'}
        console.log(a) //报错
    解决：加圆括号
        let a='你好'
        ({ a } = {a:'我好'})
        console.log(a) '我好'
    字符串解构：
        const [a,b,c,d,e] = 'hello'

三、for...of
    for(var i=0;i<3;i++)
    for .... of 可以避免帮我们开辟内存空间，获取到的是数组里面的值，既可以遍历数组也可以遍历Map对象
    for .... in 获取到的是索引值
四、map对象遍历
    let a= new Map()
    a.set('username','admin')
    a.set('password','123')
    console.log(a) 得到一个包含键值对的数组
    for(let [key,valve] of a) {} //利用数组结构获取出key和value
五、模板字符串
    String扩展方法：模板字符串，startsWith()和endsWith()、repeat()

    模板字符串可以解析变量，可以换行，可以调用函数（返回函数执行结果）
    ${}
    传统写法：console.log('name'+name+'age'+age)
    模板字符串：console.log(`name:${name},age${age}`)
    
    startsWith（）表示字符串是否在原字符串的头部，返回布尔值
    endsWith（）表示字符串是否在原字符串的尾部，返回布尔值

    let str = 'Hello my girl'
    str.startsWith('Hello')
    str.endsWith('girl')

    repeat()表示将原来字符串重复n此，返回一个新的字符串
    'x'.repeat(3) //'xxx'
    'hello'.repeat(2) //'hellohello'
六、箭头函数
    箭头函数中的this指向是函数在定义时候决定的，箭头函数中的this不变，永远绑定在当前环境下。

七、默认参数赋值
    曾经：function add(a,b) {
            a=a?a:0
            b=b?b:0
            return a+b
    }
    现在：function add(a=0,b=0) {
          return a+b
    }
八、扩展运算符...
    我们定义一个方法但是不确定其中参数个数1的时候就用扩展运算符作为参数。扩展运算符还可以复制数组。var arr2=[...arr1] 。可用于函数调用
    rest运算符:function r(a,b,...arg){} 在这里rest是...arg代表除了a，b之外的参数。用于只知道部分内容，剩下多不知道。可用于函数声明
               r(1,2,3,4,5,6,7,8) 
    let arr = [1,2,3]
    ...arr // 1,2,3 去掉了[]
    console.log(...arr) //输出1 2 3 没有逗号，因为使用扩展运算符将数组拆分为逗号分割的数组放在console.log之后，逗号被当作console.log的参数分隔符
    扩展运算符用于合并数组扩展运算符可以把数组拆分为以逗号分割的参数序列，我们可以序列加数组中括号重新变为数组
    let arr1=[1,2]
    let arr2=[3,4]
    //...arr1,
    //...arr1,
    let arr3 = [...arr1,arr2]
    arr1.push(...arr2)
    利用扩展运算符将伪数组转化为真数组
    var oDivs = document.getElementByTagName('div')//获取到为数组[0:div,1:div,2:div,length:3]
    var arrnew = [...dDivs] //转化为真正数组
    还可以使用Array.from(arrLike,mapFn,thisarg)把伪数组转化为真正数组
    let newArr = Array.from(oDivs)

九、Set数据结构：
    Set类似于数组，但是成员唯一，没有重复值，可以用来搜索功能，网站记录用户搜索关键字，方便下次直接点击历史关键字搜索。
    Set本身是构造函数，用来生成Set数据结构
    const s = new Set()
    利用Set可以用来数组去重
    let arr = new Set(["1","2","3","4"])
    let arrnew = [...arr]
    Set是种数据结构，就有一些实例方法
    add(value) 添加，返回Set结构本身
    delete(value) 返回布尔值，表示是否删除成功
    has(value)返回一个布尔值，表示该值是否是Set的成员
    clear()清除所有成员

    比如：let s = new Set()
          s.add(1).add(2).add(3)
          s.delete(2)  
          s.has(2)
          s.clear()
    Set数据结构和数组一样，也有forEach方法，对于每个成员执行某种操作，没有返回值
    s.forEach(value => console.log(value))
