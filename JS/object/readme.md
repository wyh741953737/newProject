Object是构造函数创建的对象包装容器
一、语法：对象初始化器，或者对象字面量
    {[nameValuePair[,nameValuePair2[,...nameValuePairN]]]}
    构造函数形式调用
    new Object(value)

    ------  nameValuePair 成对的 名称 与 
    以非构造函数调用时，Object等同于new Object（）

二、Object属性
    Object.length
    Object.protoType

三、Object构造函数方法
    Object.assign()
        拷贝原对象自身且可枚举的属性到目标对象，该方法使用源对象的get和目标对象的set，所以它会调用setter和getter，因此它分配属性而不仅仅是复制或者定义新属性。
        继承属性和不可枚举属性不能拷贝
        
    Object.create()
    Object.defineProperty()
    Object.defineProperties()
    Object.entries()


