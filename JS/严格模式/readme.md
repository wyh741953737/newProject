严格模式：ES5添加的第二种运行模式。
        让代码变得更加严谨，消除一些不合理不严谨之处，减少一些怪异行为。
        消除代码允许的一些不安全指出，为未来新版本的js做好铺垫。

        1：必须用var声明变量：正常模式，变量没有声明就使用，默认是全局变量，严格模式必须显示声明。
        2：禁止自定义函数中的this指向window，undefined
        3：创建eval作用域
        4：构造函数必须使用new实例化对象。
        5：为了向将来新版本js过度，严格模式设置了一些保留字：interface，private，pbulic，static，yield，package，let，protected，implements
        6：函数必须声明在顶层。
        7：对象不能有重名属性。
