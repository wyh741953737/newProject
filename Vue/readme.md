生命周期：
new Vue() --->
进行一些初始化，Events和lifeCycle--->
之后调用beforeCreate………………………………………………………………………………………………>
执行完·初始化injections（注入，引入）和reactivity--->
调用created………………………………………………………………………………………………………………………>
判断有el吗----------->有挂载el
判断是template吗-------有-编译template成render函数
               -------没有-意味着已经编译为render函数
调用beforeMounted………………………………………………………………………………………………………>
之后用vm.$el替换el（意味着之前template挂载到DOM上了）
之后调用mounted函数……………………………………………………………………………………………………>
当数据发生变化，会调用beforeUpdated-…………………………………………………………………………
打补丁然后重新渲染虚拟DOM----->
调用updated意味着渲染完成……………………………………………………………………………………>
如果组件不再使用，先调用beforeDestroy意思是我将要被销毁……………………>
执行回收操作（回收监听者，组件等）--->
调用destoryed销毁完成……………………………………………………………………………………………………
     

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
相同的功能，只要渲染的内容不管变不变，methods调用的次数为渲染的次数，computed内部会缓存，所以相同内容只会调用一次
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

    lazy:默认情况下，v-model默认是在input事件中同步输入框数据的，一旦数据改变，对应的data自动改变，lazy修饰符可以让数据在失去焦点或者回车时才更新。
   <input v-model.number='agge'>
    
    number修饰符：默认情况下，在输入框无论我们输入的是字母还是数字，都会被当作字符串类型处理，但是如果我们希望处理的是数字，就用number修饰符
   <input v-model.number='agge'>
    trim修饰符可以过滤内容左右（首尾）空格
   <input v-model.trim='agge'>

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
        <!-- this.letter.push('c','d')/pop()/unshift(e,f)/shift() -->
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
    <input :value='bindMessage' @input='changeValue'/>
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
        <div><h2>组件标题</h2></div>`
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

注册全局组件：
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

slot插槽，目的：让原来的设备具有扩展性。slot是组件的一块html模板，这块模板显不显示以及怎样显示由父组件决定。插槽的显示位置由子组件决定。

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
    模块化有两个核心，导入导出
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

如果你要用2.x版本的cli，要初始化：
    npm i @vue/cli-init -g

脚手架2.x初始化项目：vue init webpack my-project
脚手架3.x初始化项目：vue create my-project


区别只在main.js
runtime-only:   1,没有注册，直接render:h => h(App),2:不可以使用template。h代表createElement。
runtime-compiler：1，在new Vue里面注册components：{App}，2：可以使用template：'<App/>'


runtime-compiler中template传给Vue的时候，会保存在Vue.options，把template进行parse（解析），解析成一个抽象语法树（abstract syntax tree）ast，之后编译compiler成render函数。通过render函数把template翻译为虚拟DOM，最后渲染为真实DOM。

template->ast->render函数->虚拟DOM->真实DOM

runtime-only没有template，直接render函数到虚拟DOM，性能更高，代码量更少。因为没有template-ast-renader的过程。

runtime-only中引入的App.vue有template是谁解析的？
由我们之前安装的Vue vue-tempalte-compiler编译的。

npm run build过程：1，找到入口文件 --》config/index.js--》生产环境参数 --》NODE_ENV：'production
                           |
                           |
                    build/webpack.prod.conf--->build.utils -->1.计算资源的存放路径，
                           |                                  2.生成cssLoader用于加载vue中的样式
                           |                                  3.生成styleLoader加载不在Vue中的样式 
                           |
         build/webpack.base.conf --->定义了入口,出口，编译规则，插件相关配置.上面两个文件合并，其实就是我们单独用webpack打包编译需要的文件
                           |
                           |
                    build/vue-loader.js
                           |
                           |
                        导出一些vue配置选项相关 

修改1webpack配置：webpack.base.conf.js起别名
resolve: {
    extensions:['.js','.vue','.json'],
    alias: {
        '@':resolve('src'),
        'pages':resolve('src/pages'),
        'common':resolve('src/common'),
        'components':resolve('src/components')
        'network':resolve('src/network')
    }
} 

vue-cli3是基于webpack4打造的，vue-cli2还是webpack3打造
vue-cli3设计原则：‘0配置‘，移除配置文件根目录下的build和config等目录
vue-cli3提供了vue ui 命令，提供了配置可视化图像界面，更加人性化。
vue-cli3移除了static文件夹，新增了public文件夹，并且index.html移到public中

在package.json中"@vue/cli-service"又帮我们管理了很多其他依赖包（隐藏起来了—

new Vue({
    el:'app'
})
new Vue({
    render: h => h(App)
}).$mount('app')
一样,没什么区别，el:'app'最终还是执行$mount('app')

安装vue ui，npm i @vue/cli -g的时候会安装vue，会包含vue-ui，可以启动一个本地服务

执行vue ui就可以启动（本地服务器）之后会出现界面。

你可以在vue.config.js中配置，vue之后默认会和藏起来的配置合并起来

路由：路由、转送。输入端-输出端。
路由表：映射表，决定数据包的指向。


前端路由的核心：改变url，但是页面不进行整体刷新
如何实现？
1：url的hash：改变url的hash，页面不整体刷新，location.hash=
2：html5里的history，history.pushState({},'','home').类似栈结构。
history.back()将栈顶的路由移除
history.replaceState({},'','home') 彻底替代，不能再前进后退。
history.go（-1）回退到上一个历史url，等价于history.back(),history.go(-2),history.go(1),前进。history.forward(1),前进

安装路由：npm i vue-router --save
1,Vue.use(VueRouter)
2.创建路由实例，并且传入路由的映射配置
3.在vue实例中挂载创建的路由实例。

import VueRouter from 'vue-router'
import vue from 'vue'
//创建的路由组件
import Home from './home'
import About from './about'

Vue.use(VueRouter)

//配置路由组件之间的应用关系
const routes = [
    路由默认路径
    {
        这样有点小问题
        <!-- path: '',
        redirect:'/home'重定向，每匹配上路径就重定向到home -->
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/about',
        component: About
    }
]
const router = new VueRouter({
    routes，
    mode:'history'这样就可以把路由中的#去掉（默认hash改为history）
    linkActiveClass:'active'//点击时候的样式。
})
export default router

在main.js中new Vue({
    el:'app',
    router,
    render: h => h(App)
})


在App.vue中加路由切换渲染标签：router-link是路由的组件，会被渲染为a标签，
<template>
    <div>
       <router-link to='/home'>首页</router-link>
       <router-link to='/about'>关于</router-link>
       <router-view></router-view>占位，要渲染的在下面渲染，放上面就在上面显示
    </div>
</template>

路由默认路径

router-link的属性to还有tag，可以把to的a标签渲染为你tag写的标签，比如tag='button'，写replace路由就不能前进后退。active-class=''改选中的样式，一般不这样，在路由中：const router = new VueRouter({中})linkActiveClass

如果你不想用router-link
<button @click="btnclick">首页</button>

methods: {
    btnclick() {
        history.pushState()//不要这样跨过路由改路径
        通过this.$router.push('/home')
        this.$router.replace('/about')      
    }
}

路由携带参数：
{
    path:'/home/:userid',
    component:Home
}

<router-link :to='/home/'+userid>主页</router-link>

this.$route谁处于活跃就是谁
this.$router获取的是VueRouter实例

$route.params参数
computed: {
    userid() {
        return this.$route.params.userid
    }
}

路由懒加载：打包构建的时候，js包会很大，影响页面加载（有些用户电脑出现短暂的空白，如果我们把不同路由对应的组件分割成不同代码块，然后当路由被访问的时候才加载对应组件，这样更高效。
js文件夹有三个文件，app.dsfsf8sd.js（我们写的业务代码）,manifest.wr34453ffsdfd.js（底层导入导出支持），vendor.haere453csh.js第三方。文件没有分包

路由懒加载做了什么？
将路由对应的组件打包成一个个js代码块，只有在这个路由被访问时候才加载对应的组件。

懒加载写法：
 const routes
  = [
      {
          path:'/home',
          component: () => import('../components/Home')
      },
      {
          path:'/about',
          component: () => import('../components/About')
      }
  ]

这样写了之后，js文件就变成很多js文件：0.er43423434.js、1.3r224dsfrg.js、app.ddfd2f.js、manifest.fdi3huhg.js、vendor.siehferuhy4g4.js

懒加载方式：
一、结合Vue的异步组件和webpack的代码分析：
    const Home = resolve => {require.ensure(['../components/Home.vue'],() => {
        resolve(require('../components/Home.vue'))
    })}
二。AMD写法：
    const About = resolve => require(['../components/About.vue'].resolve)
三、在es6中
    const About = () => import('../components/About.vue')

路由嵌套：
1.children:[
    {
        path:'News',//子路由不加/
        component: () => import('../components/Home/News'),
        meta: {
            title:'新闻'
        }
    }
]
2.在Home首页加router-link
<template>
    <div>
        <router-link to="/home/news">新闻</router-link>
        <router-link to="/home/message">消息</router-link>
        <router-view></router-view>
    </div>
</template>

传参数：
1:
<router-link :to="{path:'/profile',query:{name:'wyh',age:23}}"></router-link>
query会拼接在url上，获取：$router.query.name

<button @click='go'>跳转</button>

go() {
    this.$router.push('/user/'+this.userId)
}
gos() {
    this.$router.push({
        path:'/aboyt',
        query: {
            name:'eileen'
        }
    })
}
1.query类型：
配置路由/router
传递方式：query
传递后形成的路径：/router?id=123

2.params类型：
配置路由/router/:id
传递方式：path后面根对应的值
传递后形成的路径：/router/123

$router和$route的区别：
$route就是你配置的{path:'/home',component:Home},活跃的路由，可以获取name，path，query，params
$router就是VueRouter实例，想要导航到不同url，使用$router.push方法

全局导航守卫：对跳转过程进行监听。
导航守卫：改变document.title的名字生命周期用导航守卫实现：

前置钩子
router.beforeEach(function(to,from,next) {
    document.title = to.matched[0].meta.title
    next()
})
在react中使用：export default withRouter(App）
可以根据路由切换浏览器的title属性，对props.history进行监听，切换路由的时候获取当前的路由路径，同时可以根据不同的路由设置不同的浏览器title标题。
meta元数据，描述数据的数据。
metaclass元类
 
 afterEach后置钩子，不用调用next
 还有路由独享守卫 {path:'/foo',component:Foo,beforeEnter:(to,from,next) => {}}
 、组件内的守卫:const Foo = {
     template:...
     beforeRoutEnter(to,from,next) {
         不能获取到组件实例this，当守卫执行前，组件实例还没被创建
     }
     beforeRouteUpdate(to,from,next) {

     }
     beforeRouteLeave(to,from,next) {

     }
 }

 keep-alive：是vue内置组件，可以使被包含组件保留状态。比如有新闻和消息两个列表，当你点击新闻显示新闻列表，点击消息显示消息列表，你每次切换的时候都会重新创建组件，如果你想把状态保留下来，不想重新创建组件，就用keep-alive
 router-view也是一个组件，如果直接被包在keep-alive里面，所有路径匹配到的视图组件都会被缓存。

 
 Vue2.0/3.0双向数据绑定的实现原理
    2.0 ES5：Object.defineProperty实现数据拦截
    3.0 proxy

MVC和MVVM区别
没什么区别。vue的mvvm双向数据绑定，什么是双向》数据更改视图会变化，视图变化，数据也会变化，视图变化数据怎么变化》无外乎监听onchange，oninput事件，监听拿到最新至，数据一改，就影响了视图。只要我们能让数据影响视图。如果非要有区别，vue帮我们把onchange和oninput做好了，react要我们自己实现。

MVC单向数据改变，mvc默认只实现了数据的更改控制视图
MVVM双向数据改变，mVVM实现了数据的更改控制视图，视图改变数据，onchange/oninput

react中自己实现：
state = {
    name:''
}
componentDidMount() {
    this.setState({
        name:'hello'
    })
}
render() {
    return(
        性名:<sapn>{name}</sapn>
        <input value={name} onChange={e =>this.setState({name:e.target.value})} />
    )
}



在你进入某个界面，默认选中某个路由
router-link
activated活跃函数
this.$router.push(this.path)
deactivated不活跃函数
组件内路由导航：
beforeRouterLeave（to,from,next) {
    this.path = this.$route.path
}


别名，webpack.base.js中resolve
resolve: {
    extensions: ['.js','.vue','.json'],
    alias: {
        '@': resolve('src'),
        'assets': resolve('@/assets'),
        'components':resolve('@/components'),
        'view': resolve('@/view')
    }
}
引入的时候，html中<img src="~assets/img/p.jpg">




vueJs给我们带来最大的便利是？响应式，
管理：所有组件共享对象中的变量，自己可以封装，但是想让它响应式比较难。

Vuex状态管理模式（集中式存储管理）

状态管理包括：（单项数据流
1）state，驱动应用的数据源 ->
2）view，以声明式将state映射到视图->
3）actions，响应在view上的用户输入导致状态变化->

哪些状态需要共享？
用户登录状态，头像，地理位置，商品的收藏，购物车的物品等，

全局单例模式（大管家）
将共享状态抽取出来，交给大管家进行统一管理，之后每个视图按照规定进行访问和修改，这就是vuex的思想。

当你要修改store中某个状态的时候，dispatch一个action（异步操作要在action中），然后commit提交到mutation，devtools是vue开发的一个浏览器插件，记录修改（同步），mutation去修改mutate）state。

单一状态树（single source of Trutch）
只有一个store，方便维护和管理。

### vuex五个核心概念：
- state，所有的state都被添加到vue的响应式系统里面，state发生改变会被观察到，Dep-》对应很多[watcher]
- getters：类似计算属性，某个数据需要经过一系列运算后才使用的时候使用
- mutations：像redux的的reducer，dispatch一个action，通过reducer修改数据，vuex中commit一个action
        更改store里面的state唯一办法是提交mutations，mutations： {add(){},mul(){}} ,thie.$store.commit('add')
        mutation传递参数，参数是mutation的payload负荷
        mutation提交风格：普通向上面，另一种包含type的提交。
        this.$store.commit({
            type:'increment',
            count:count
        })
        mutations:{
            increment(state,payload) {
                state.counter = payload.count
            }
        }
        mutation响应规则：
            1：state是响应式的，当state发生改变，视图对应改变。前提是这个属性被添加到响应式系统，后面增加的不会同步变化。比如student对象有name，age，之后你通过state.student['hobby']='sing'无法将hobby属性添加到student上面。响应式的操作：push，pop，shift，unshift是响应式的。需要通过：Vue.set(state.student,'hobby','sing')。删掉：delete state.student.age.界面不改变，做不到响应式。需要通过：Vue.delete(state.student,'age')
        mutation常量： 在mutation中定义了很多事件类型（也就是其中方法名称），项目越大，mutation中方法越多，需要花费更多时间记住这些方法，来回切换出错。
        export const ADD = 'add'
        import {ADD} from '..'
        mutations: {
            [ADD](state) {},
            [increment](state){}
        }
        mutation同步函数：vuex要求mutation的方法必须是同步方法，主要原因是当我们使用devtools时，devtools可以帮助我们捕捉mutation快照，如果是异步操作，devtool不能很好的追踪这个操作什么时候会被完成。

- action：action类似mutation，但是这个是用来替代mutation来做异步操作的。
      
- module：划分模块,vue使用单一状态树，意味着很多状态都会交给vuex管理，应用越复杂，store就越臃肿，module就是解决这个问题，让每个模块都有自己的state，mutation，action，getters

- const ModuleA= {
    state:{
        hobby:'羽毛球'
    },
    mutations:{
        playBox(state,payload) {
            state.hobby = payload
        }
    },
    actions: {           | context,对象解构
        playGame({state,commit,rootState}) { //这里的context的commit只会调用自己模块里面的mutation
            setTimeOut(()=>{
                contex.commit('playBox','watchGame')
            },1000)
        }
    },
    getters: {
        playTV(state) {

        },
        playAll(state,getters) {//还想用其他getter
            return getters.playTV + state.hobby
        },
        playgetM(state,getters,rootState) { //还想用大模块里面的state，rootState表示根state
            return getters.playTV + rootState.playMusic
        }
    }
}
const ModuleB= {state:{},mutations:{},...}

- const store = new Vux.store({
 -   state: {
        counter: 1000,
        playMusic:'玩音乐',
        student:[
            {id:1,name:'M',age:25},
            {id:2,name:'E',age:20},
            {id:3,name:'N',age:15},
        ]
    },
-    mutations: {
        increment(state) {
            state.counter++
        },
        decrement(state) {
            state.counter--
        },
        add(state,count) {
            state.count += count
        }
    },
-    getters: {
        powerCount(state) {
            return state.counter * state.counter
        },
        getAgeGt(state) {
            return state.student.filter(s => s.age>20)
        },
        moreAge20(state) {
            return function(age) {
                return state.student.filter(s=>s>age)
            }
        },
        addStu: function(state,stu) {
            return state.student.push(stu)
        }
    },
-    actions: {
        asyncUpdate(context,payload) { //这里的context是store对象
            return new Promise((resolve,reject) => {
                setTimeOut(() => {
                    context.commit('asyncUpate')
                    resolve('成功')
                },1000)
            })
        }
    },
 -   modules: {
        a: ModuleA
    }
})

在其他引用了store的组件中
<h1>counter</h1>
<h2>{{$store.getters.powerCount}}</h2>
<h2>{{$store.getters.moreAge20(10)}}</h2>
<button @click="update">更新</button>
<h2>moduleA中的内容state:{{$store.state.a.hobby}}拿到a可以直接.hobby</h2>
<h2>moduleA中的内容mutation:{{$store.state.a.hobby}}拿到a可以直接.hobby</h2>
<button @click="changeplayBox">moduleA中的内容action</button>
<h2>moduleA中的内容getters用法: --> {{$store.getters.playTV}} 不管getters在哪</h2>
<button @click="asyncChangeBox">moduleA中的内容action异步修改兴趣</button>

computed: {
    counter: function() {
        return this.$store.state.counter
    }
}
methods: {
    add: function() {
        this.$store.commit('increment')
    },
    addCount: function(count) {
        let stu = {id:4,name:'R',age:23}
        this.$store.commit('decrement',count)
        this.$store.commit('addStu',stu)
    },
    update() {
        <!-- this.$store.dispatch('asyncUpdate','我是参数') -->
        this.$store.dispatch('asyncUpdate',() => '我是参数').then(res => {})
    },
    changeplayBox() {
        this.$store.commit('playBox','paint')
    }，
    asyncChangeBox（） {
        this.$store.dispatch('playGame')
    }
}
