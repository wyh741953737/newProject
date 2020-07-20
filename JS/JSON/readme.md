ES5提供的
1：将js对象（数组) --> json对象（数组）：JSON.stringify(obj/arr)
2:json对象（数组） --> js对象（数组） ： JSON.parse(json)
我们常说的json字符串，只要2中：json对象，json数组

ES5给Object扩展了一些静态方法，常用的2个：
    Object.create(prototype,[descriptors])
    用以指定对象为原型，创建新的对象，第二个参数可以为新对象添加新的属性，并对此对象进行描述。
    eg：var obj1 = {username:'Eila',age"12}
        var obj2 = Object.create(obj1)
        console.log(obj2) //__proto__:{age:12,username:'Eila'}

        以obj1为原型创建出一个对象。
        var obj3 = Object.create(obj1,{
            mobile:{
                value:'nam',
                writable:false,
                enumberable:true
            }
        })
    
使用Object.create可以实现继承

使用Object.definePrototype(对象，属性)来修改/设置属性。
使用Object.defineProperties(对象，属性)

