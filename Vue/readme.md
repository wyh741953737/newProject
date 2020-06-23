计算属性：computed
    内部其实是set和get，但是一般不用set，只读
    computed：{
        getFullnameV: {
            set:function(newValue) {

            },
            get:function() {

            }
        }
    }
    简化
    computed：{
        getFullnameV: function() {
                
    }
    
methods和computed对比：
相同的功能，要渲染的内容不管变不变，methods调用的次数为渲染的次数，computed内部会缓存，所以相同内容只会调用一次
methods相对来说性能低一点

$event获取浏览器event
修饰符：
    .stop阻止事件冒泡（ie，canclebubble，其他e.stopprogration（））
    <button @click.stop='doThis'></button>

    prevent阻止默认事件（IE，cancleDefault=true，其他e.preventDefault()）
   <button @click.prevent='doThis'></button>
   <button @submit.prevent='doThis'></button>
   <button @click.stop.prevent='doThis'></button> 阻止冒泡和默认行为

    .{keyCode | keyAlias}只当事件是从特定键触发时才回调
   <input @keyup.enter='onEnter'></input> 监听enter事件触发
   <input @keyup.13='onEnter'></input> 监听13事件

    .native 监听组件根元素的原生事件，监听组件
   <Com @click.native='clickon'></Com>


    .once只触发一个回调
   <button @click.once='doThis'></button>

    lazy:默认情况下，v-model默认是在input事件中同步输入框数据的，一旦数据改变，对应的data自动改变，lazy修饰符可以让数据在市区焦点或者回车时才更新。
   <input v-model.number='agge'>
    
    number修饰符：默认情况下，在输入框无论我们输入的是字母还是数字，都会被当作字符串类型处理，但是如果我们希望处理的是数字，就用number修饰符
   <input v-model.number='agge'>


    trim修饰符可以过滤内容左右（首尾）空格
   <input v-model.trim='agge'>

v-if
v-else-if
v-else

问题：在有输入框的时候，切换类型，两个类型都有input，在第一个输入框输入了值之后切换到第二个类型，输入框内容不变
答：因为Vue在进行DOM渲染时，出于性能考虑，尽可能复用已经存在的元素，而不是重新创建新的元素
Vue内部发现原来的input元素不再使用，直接作为else中的input使用
解决：如果我们不希望Vue出现类似重复利用的问题，可以给对应的input添加key，要保证key不同

v-show和v-if区别：
v-show在文档中存在，让它不显示，只是把display变为none。需要在显示与隐藏间切换频繁用v-show
v-if条件为false时，元素不会存在DOm中。只有一次切换时候选择v-if

遍历数组：v-for='item in list'
遍历对象：如果只是获取一个值，那获取到的是value
        如果要获取key，value格式，v-for='(key，value）in info
        如果要获取key，value格式，v-for='(key，value，index）in info
为什么要key？
和vue虚拟DOM的diff算法有关，当某一层有很多相同节点时，我们希望插入一个新节点，
let arr = ['A','B','C','D','E','F']
在B和C之间加一个X，diff算法默认执行起来是这样的：把C换成X，D换成C，E换成D，最后插入F，这样很没效率。
加了key之后，每个节点有了唯一标识，diff算法可以正确识别此节点，找到对应的位置插入，key的作用是为了高效的更新虚拟DOM
 arr.splice(2,0,'X')
 key的值和{{}}里的值保持一致，要保持唯一性。

做到响应式：
data:{letter:['a','b']}
methods:{
    occc() {
        <!-- this.letter.push('c','d') -->
        <!-- this.letter.pop() -->
        <!-- this.letter.shift() -->
        <!-- this.letter.unshift('e','f') -->
    }
}
非响应式：this.letter[0]='aa'

filters过滤器

v-model表单元素和数据的双向绑定

v-bind和v-model区别
v-model语法糖，背后本质包含两个操作：v-on给当前input绑定input事件和v-bind结合
 v-model:
    <input v-model='message'/>
    <p>{{message}}</p> //根据输入实时同步

v-bind:
    <input :value='bindMessage'/>
    <p>{{bindMessage}}</p>//只是在第一次同步
    可以再绑定事件v-on:input='changeValue'
    <input :value='bindMessage' :input='changeValue'/>
    在methods中声明changeValue(e){
        this.bindMessage = e.target.value
    }
添加同样的name='sex'互斥

什么是组件化？
将一个页面，拆解为不同功能的组件，整个页面的管理和维护变得非常容易

Vue组件化思想：
它提供了一种抽象，让我们可以开发出一个个独立可复用的小组将来构造我们的应用，任何应用都可以被抽象成一颗组件树

组件的使用步骤：
创建组件构造器 Vue.extend()创建
注册组件Vue.component()注册全局组件
使用组件 new Vue

使用：
<div id='app'>
   <myCom/>
</div>

创建组建构造器：
const myComponent = Vue.extend({
    template:`
        <div><h2>组件标题</h2></div>
})

注册组件：
Vue.component('myCom',myComponent)
----------------------------------------------
创建组建构造器：
const areaCnp = Vue.extend({
    template:`
        <div><h2>组件标题</h2></div>
})
new Vue({
    data:{},
    components: { //这样注册的是局部组件,组件构造器挂载到Vue实例下面
        area-Cnp:areaCnp
    }
})

组件不能访问Vue实例数据
组件是一个单独功能模块的封装，这个模块有属于自己的HTML模块，也有属于自己的data
组件中的数据保存在哪里？顶层Vue实例中?
不能访问，即使能也不要把data放在vue实例中，组件应该有属于自己的数据管理的地方。
组件自己也有一个data属性，必须是函数，而且这个函数返回一个对象，对象内部保存着数据
组件的原型指向Vue实例，所以有Vue的一些特性
Vue.component('cpn',{
    template:'#cpn',
    data() {
        return {
            title:'hello'
        }
    },
    methods : {
        increment() {},
        decrement() {}
    }
})
Vue设计的时候，为什么要设计成函数？

首先我们来看个小例子：
function test(){
    return {
        name:'eileen',
        age:12
    }
}
let p1=test()
let p2=test()
p1和p2指向不同的地址，不会相互影响

如果说：
function test() {
    name:'eileen',
    age:12
}
多个地方引用同一个对象，某个地方修改了这个状态的数据，其他调用的都变了，这是我们不想看到的。

注册全局组件语法糖：
    Vue.Component('cpn',{
        trmplate:`
        <div>
        </div>
})
注册局部组件语法糖：
  const app = new Vue({
      el:'app',
      components: {
          'cpn2': {
              trmplate:`
                <div>
                   <h1>nihao</h1>
                </div>
          }
      }
  })  

  模板语法糖
 1. <script type="text/x-template" id="cpn">
            <div>
                   <h1>nihao</h1>
            </div>
 </script>>
    Vue.Component('cpn',{
        template:'#cpn'
    })
2.template标签
    <template>
        <div>
            <h1>nihao</h1>
        </div>
    </template>




父传子props
const cpn = {
    template:'#cpn',
    //props可以是数组
    props:['movies','message']
    //也可以是对象，类型验证
    props:{
        <!-- movies:Array,
        message:String
        //也可以提高一些默认值
        meaasge:{
            trye:string,
            default:'nn',
            required:true
        } -->
        cInfo:{
            type:object,
            default() {
                return{}
            }
        },
        meaasge: {
            type:string,
            default:''
        }
    },
    data () {
        return {}
    }
}
const app = new Vue({
    el:'#app',
    data: {
        //要传到子组件的数据
        info:{
            name:'ela',
            age:12
        },
        message:'aaa'
    },
    components: {
        cpn
    }
})

子传父$emit event

<!-- 父组件模板 -->
<div id='app'>
    <child v-on:itemclick="cpnclick" ></child>
</div>

<!-- 子组件模板 -->
<template id='child'>
  <div>
     <button V-for="item in categories"
     @click="btnClick(item)"
     >{{item.name}}</button>
  </div>
</template>
//子组件
const child = {
    template:'#child'，
    data() {
        return {
            categories:[
                {id:'1',name：'热门推荐'},
                {id:'2',name：'手机数码'},
                {id:'3',name：'美妆'},
                {id:'4',name：'美衣'},
                {id:'5',name：'母婴'},
            ]
        }
    },
    methods:{
        btnClick(item) {
            this.$emit('itemclick',item)
        }
    }
}
//父组件
const app = new Vue({
    el:'app',
    data: {
        message:'hello'
    },
    components: {
        child
    },
    methods:{
        cpnclick() {
            console.log('fff)
        }
    }
})


父组件的访问方式：$children
父直接访问子：$children或者$refs
子直接访问父：$parent

this.$children是一个数组类型[VueComponent]，它包含所有子组件对象
通过遍历可以取出所有子组件的message状态,比较少用

$refs
<cpn ref='aa'></cpn>
this.$refs.aa就可以访问

子访问父，开发中不太建议。这样的话子组件就不能够独立，复用性就不太强了。耦合度太高了
访问根组件$root

slot插槽，目的：让原来的设备具有扩展性。

预留位置，比如说导航栏，预留位置。
具名插槽：
<div id='app'>
    <cpn><span slot='left'></span></cpn>
</div>

<slot name='left'></slot>
<slot name='center'></slot>
<slot name='right'></slot>

编译作用域：：
    查找变量的时候看使用的哪个模板，Vue实例就在Vue实例中找，不会看是不是在哪个组件使用的
作用域插槽：
    父组件替换插槽里的标签，但是内容是由子组件提供的

    父组件如何拿到子组件的数据：父组件对子组件展示的东西不满意，想以另一种方式展示，但是内容还是子组件给

模块化开发：
    在多人开发的项目中，比如小明，小红，分别创建了文件a，b
    如果小名在a中定义了变量flag=true，而小红在b中耶定义了变量flag=false
    此时，就会产生命名冲突，得不到意料之中的结果。
    利用匿名函数（定义一个对象，给这个对象添加属性和方法，最后将这个对象返回）可以解决命名冲突，但是如果c文件要引用a文件中的flag，就会访问不到，利用闭包解决命名冲突会让组件复用性太低。
    模块化开发不仅可以防止命名污染，解决命名冲突，还可以实现复用性。
    取模块的名字不一样，将模块导出。
    前端模块化有很多规范：
        CommonJS，AMD，CMD也有ES6的modules
    模块化有两个核心，导入，到处
    CommonJS，Webpack和node都是用的CommonJS导出
    webpack底层要用node
commonJS导出：
    module.export = {
        flag:true,
        test() {
            return 1+1
        }
    }
commonJS导入：
    var {flag,test} = require('./a.js')


ES6模块化：
    导入：import
    导出：export

    export default可以允许别人在导入的时候，自命名。
    export default只能有一个，import AA from 'a.js'

使用vue
npm i vue

runtime-only（运行时-only） 代码中不能有任何的template
runtime-compiler compiler可以编译template
module.exports = {
    entry:'',
    resolve: {
        alias: {//取别名，，你使用runtime-only的时候想编译template
        extensions: ['.js','.vue','.css']
        }
    }
}

webpack配置Vue
1，为打包的文件添加版权声明，BannerPlugin，属于webpack自带插件
```
const path = require('path')
const webpack = require('webpack')
module.exports = {
    ....
    plugin: [
        new webpack.BannerPlugin('最终版权归coderwhy所有')
    ]
}
```
重新打包，查看bundle.js头部，看到如下信息：
/*!最终版权归coderwhy所有*/
/*****/(function(modules) {})

在dist创建index.html使用html-webpack-plugin
new HtmlWebpackPlugin({
    template: 'index.html'
})

js压缩
开发环境不建议丑化，发布阶段要
uglifyjs(丑化)-webpack-plugin
new UglifyjsWebpackPlugin()

搭建本地服务器
webpack-dev-server
contentBase为哪个文件夹提供本地服务，默认是根文件夹
port：端口号
inline：页面实时刷新
historyApiFallback：在SPA页面中，依赖HTML5的history模式。
在package.json中配置"dev":"webpack-dev-server --open"

webpack文件分离：公共放在base.config.js
                开发：dev.config.js
                生产：production.config.js
为了把base和dev、base和production合并，我们要下载一个插件
  npm i  webpack-merge --D

导入：const WebpackMerge = require('webpack-merge')
const baseConfig = require('./base.config)
module.exports = WebpackMerge(baseConfig,{
    plugin: [
        new uglifyjsWebpackPlugin()
    ]
})
同时在package。json中配置
"script":{
    "build":"webpack --config ./build/prod.config.js",
    "dev":"webpack-dev-server --open --config ./build/dev.config.js"
}


Vue CLI(command-line-Interface命令行页面)俗称脚手架
node环境要8.9以上
 
CLI (@vue/cli) 是一个全局安装的 npm 包，提供了终端里的 vue 命令。
如果你熟悉 create-react-app 的话，@vue/cli-service 实际上大致等价于 react-scripts，尽管功能集合不一样。
1.安装vue脚手架
npm i -g @vue/cli

如果你要用2.x版本的cli，要初始化就：
    npm i @vue/cli-init -g

脚手架2.x初始化项目：vue init webpack my-project
脚手架3.x初始化项目：vue create my-project

