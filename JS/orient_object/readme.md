面向过程：分析出解决问题需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候再一个个依次调用。
        把食物放进冰箱：打开门，塞进去，关上门。
面向对象：把食物分解成一个个对象，然后由对象之间分工合作。
        把食物放进冰箱：找出对象，并写出这些对象的功能：
            1：食物对象：功能：进去
            2：冰箱对象：功能：打开，关闭
            3：使用食物和冰箱的功能。
面向对象是以对象功能来划分而不是步骤，
面向对象程序开发思想中：每一个对象都是功能中心，具有明确分工。
面向对象编程具有灵活，代码可复用，容易维护和开发的优点，更适合多人合作的大型软件项目。

面向对象的特性：封装性，继承性，多态性

面向对象和面向过程对比：
    面向过程：
        优点：性能比面向对象高，适合跟硬件联系很紧密的东西，例如单片机就采用面向过程编程
        缺点：没有面向对象易维护，易复用，易扩展，面向过程每个步骤联系的很紧密，其中一步有问题，维护起来就比较困难。
    面向对象：
        优点：易维护，易复用，易扩展，由于面向对象有封装性，继承性，多态性，可以设计出低耦合的系统，使系统更加灵活，易于维护。
        缺点：性能比面向过程低。适合程序比较大，多人合作
面向对象思维特点：
    1：抽取（抽象）对象共用的属性和行为组织（封装）成一个类（模板）
    2：对类进行实例化，获取类的对象
  类；抽象了对象的公共部分，它泛指某一大类
  对象：通过类实例化的一个具体对象
class name {}
var x = new name()

类中有一个constructor函数，作用是接收传过来的参数，同时返回实例对象，constructor函数只要new生成实例就会自动调用这个函数。
constructor在new的时候就会自动执行，不用调用
类里面所有函数都不能加function，函数之间不用加，

继承：子类继承父类是属性，方法 class Son extends father {}
比如父类的有加的方法，子类想调用，
class Father{
    constructor(x,y) {
        this.x=x,
        this.y=y
    }
    sum() {
        return this.x+this,y
    }
}
class Son extends Father{
    constructor(x,y){
        this.x=x,
        this.y=y
    }
}
var son = new Son(1,2)
son.sum
父类中没接收到子类传递的参数，===》  super
super关键字可以让子类访问和调用对象父类上的函数（包括构造函数和普通函数）
class Father{
    constructor(x,y) {
        this.x=x,
        this.y=y
    }
    sum() {
        return this.x+this,y
    }
}
class Son extends Father{
    constructor(x,y){
       super(1,2)
    }
}
var son = new Son(1,2)
son.sum()
//super.sum可以调用父类的普通函数
//继承中属性或者方法查找原则：就近原则
super必须在子类this之前调用。

ES6中类没有变量提升，所以必须先定义类，才能通过类实例化对象
constructor中的this指向实例对象，
方法中的this指向看谁调用了。
类里面共有属性和方法一定要加this


构造函数
在es6之前，对象不是通过类创建的，而是通过构造函数来定义的。
面向对象的核心就是抽取公共部分，抽成一个类，通过这个类创建对象

创建对象方法：
    对象字面量
    new Object()
    自定义构造函数

当你new的时候：创建出一个空对象，将构造函数的原型指向新对象的__proto__,把this指向这个空对象，执行代码，为这个新对象添加属性和方法，返回这个实例对象，所以构造函数中不需要return

属性和方法称为成员
实例成员：构造函数内部通过this添加的成员，this.name中name就是实例成员
实例成员只能通过实例化对象访问，不能通过构造函数访问
静态成员：在构造函数本身上添加到成员，静态成员只能通过构造函数访问。


构造函数问题：
    浪费内存：比如说我们创建了一个star的构造函数，根据star创建两个实例对象，
            当我们创建一个对象A的时候，在内存开辟一个空间，如果对象A中只有基本数据类型还好说，如果有方法（复杂类型（函数）），又会开辟一个新的内存空间来存放这个对象中的复杂对象（函数A），
            当我们创建对象B的时候，开辟一个内存来存放对象B，B中也有同样的函数A，又要开辟一个空间存放函数A，这样的话就开辟了两个空间了存放函数A，如果有很多实例对象呢？就会开辟很多空间存放函数A 

prototype来解决开辟很多空间存放函数A 
    每个构造函数都有一个prototype属性，指向一个空对象（原型对象prototype）
    作用：共享方法，
    为什么实例对象可以访问构造函数的方法？
        实例对象有隐式原型__proto__，指向构造函数的原型对象。
    studebt.__proto__=== Person.prototype
    查找规则：就近原则
原型对象（prototype）和对象原型（__ptoto__)都有一个constructor属性，称为构造函数，因为它指回构造函数本身，constructor主要用于记录该对象引用于哪个构造函数，它可以让原型对象重新指向原来的构造函数，很多时候我们需要手动利用constructor指回原理的构造函数，
比如说Star这个构造函数，给star添加方法
    Star.prototype.sing = function() {}
    Star.prototype.movie = function() {}
    ......有很多的时候把这些方法封装成一个对象，添加到Star的原型上去。 在这里，我用.的形式往prototype添加方法
    Star.prototype={
        sing：function（）{}，
        movie：function（）{}
    } 
    在这把所有方法封装好赋值给Star.prototype之后，会把Star.prototype的constructor属性覆盖掉，这样构造函数的原型对象的constructor不再指向构造函数，需要手动改,这样就知道对象是通过哪个对象创建出来的。：
     Star.prototype={
        constructor:Star 
        sing：function（）{}，
        movie：function（）{}
    } 
    这个时候打印（Star.prortotype.constructor）会从Star变为Object
    star的原型对象里面的Constructor指向Object原型对象
原型对象中的this也指向实例对象

组合继承：ES6之前没有extends关键字实现继承，可以通过构造函数+原型对象模拟实现的继承
call继承：调用函数，修改this指向。call(要指向的对象，其他参数)

借用父构造函数继承属性

class的本质还是function，可以认为类是构造函数的另一种写法
类的所有方法都定义在prototype属性上，类创建的实例里面也有__proto__,指向类的prototype原型对象
Es6的类它的大部分功能，ES5都能做到，新的class写法只是让对象原型的写法更加清晰，更像面向对象编程的语法而已，所以es6的类其实就是语法糖。


ES5中增加的方法：
数组方法：forEach（），map（），filter（），some（），every
    forEach
    map
    filter也是查找满足条件的元素，返回符合条件的新数组
    some检测数组中的元素是否满足指定条件的元素，找到一个满足的就终止循环，找不到返回false，找到从true
    every检测数组中的每个元素，返回符合条件的元素形成的数组

    some和forEach区别：
    foreach迭代 遍历 return不会终止循环
    some遇到return true 就可以终止，所以效率更高。
    filter也不会终止循环

字符串方法：trim
trim方法去除字符串两侧的空格，返回一个新字符串，不去除中间的

Object.definePrototype
以前：添加属性：piple.num = 10
现在：Object.definePrototype（）定义新属性或者修改新的属性
    Object.definePrototype（obj，'num',{
            value:1000 //设置属性值，默认undefined
    }
    Object.definePrototype（obj，'id',{
            writable:false //不允许修改
    }
    Object.definePrototype（obj，'id',{
            enumberable:false //设置是否可枚举，遍历
    }
    Object.definePrototype（obj，'id',{
        configable:false //设置是否可被删除或是否可再次修改特性
    }

    Object.keys（obj）得到属性

    严格模式：让你的代码运行变得更严格，消除了一些代码的不合理性，不安全之处，减少了怪异行为
    1：变量必须声明才能使用，同一变量只能声明一次，已经声明的变量不能删除
    2：全局作用域中的this指向不再是window，而是undefined
    3：构造函数必须使用new调用function Star() {}   Star()报错
                            function Star(){}  var ldh = new Star()    
    4:定时器中的this还是指向window

    严格模式作用：
    严格模式变化：
    一、变量：
        1：变量要先声明再使用
        2：变量一旦声明不能删除
    二、、this指向
        1：严格模式下，在全局定义的函数中的this不再指向window，而是undefined
        2：定时器中还是window，
        3：以前构造函数可以直接调用，严格模式下通过new调用
    三、函数：
        1：以前形参可以重复，严格模式不允许重名。
        2：函数必须写在最顶层，不能放在代码块里，比如for循环里面
    
    高阶函数：
        1：函数作为参数
        2：将函数作为函数

    闭包就是典型的高阶函数，
    闭包：延申了变量的作用范围。
    闭包实例：for循环获取索引1，2，3，4+立即执行函数，每执行一次就会创建一次立即执行函数，并不是很好，而且不点击，变量一直不销毁，本来应该释放的变量得不到释放，容易造成内存泄漏
            原始：for循环外面把index保存起来，lis[index] = i
            for是同步的btn.onclick = function(){}是异步的
    异步：定时器回调函数，事件（点击）的回调函数，ajax中的回调函数，要触发才会执行。
    闭包案例：setinterval+立即执行函数+for循环实现延时打印对应的index
    