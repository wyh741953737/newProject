1、响应路由参数变化：使用路由参数的时候，如：/user/foo-->/user/bar原来组件会被复用
比起销毁再创建，复用更加高效。不过这也意味着组件生命周期不再被调用

2、复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) $route 对象：
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
}
或者使用 2.2 中引入的 beforeRouteUpdate 导航守卫：

const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}

3、通配符路由，放在最后
    {
    // 会匹配所有路径
    path: '*'
    }
    {
    // 会匹配以 `/user-` 开头的任意路径
    path: '/user-*'
    }
    使用通配符时，$route.params 内会自动添加一个名为 pathMatch 参数。它包含了 URL 通过通配符被匹配的部分：
    // 给出一个路由 { path: '/user-*' }
    this.$router.push('/user-admin')
    this.$route.params.pathMatch // 'admin'
    // 给出一个路由 { path: '*' }
    this.$router.push('/non-existing')
    this.$route.params.pathMatch // '/non-existing'

    高级匹配模式：path-to-regexp作为路径匹配引擎
    路由优先级：谁先定义谁的优先级就高

4、嵌套路由
   当你访问 /user/foo 时，User 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个 空的 子路由：

    const router = new VueRouter({
  routes: [
    {
      path: '/user/:id', component: User,
      children: [
        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中
        { path: '', component: UserHome },

        // ...其他子路由
      ]
    }
  ]
})

    router.push({path:'user'})//对象
    router.push('user') //字符串
    router.push(
        {name:'user',params:{userid:'123'}})--/user/123
    router.push({path:'user',query:{userid:'123'}})--/user/123
    router.push({path:`user/${userid}`}) --user/123
    router.push({path:'/user',params:{userid:'123'}}) --/user .参数不生效

    2.2.0版本中：router.push提供第二个和第三个参数：router.push(location,onComplate，onAbort
    onComplate被解析完成的回调
    onAbort终止（导航到相同或者别的路由）

    3.1.0版本省略第二三参数，支持promise的话，router.push和router。replace返回一个Promise

    如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 /users/1 -> /users/2)，你需要使用 beforeRouteUpdate 来响应这个变化 (比如抓取用户信息)。

    router.push和router.replace区别：
    router.replace不会向history中添加记录
    声明式：<router-link :to="..." replace>
    编程式:router.replace(...)

    router.push仿照window.history.pushState
    router.replace仿照window.history.replaceState

5、命名路由：
    {
        path:'',
        name:'user',
        component:...
    }
    要连接到一个命名路由可以给router-link的to传一个对象
    <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

6、命名视图
    一个界面展示多个视图(比如侧导航和主内容两个视图），就使用命名视图
    <router-view class="view one"></router-view>
    <router-view class="view two" name="a"></router-view>
    <router-view class="view three" name="b"></router-view>

    const router = new VueRouter({
        routes: [
            {
            path: '/',
            components: {
                default: Foo,
                a: Bar,
                b: Baz
            }
            }
        ]
    })

  嵌套命名视图：{
      path:'a',
      component:A,
      children:[
          {
              path:'aa',
              component:AA
          }
          {
              path:'b',
              components:{
                  default:C,
                  helper:B
              }
          }
      ]
  }


6、重定向
  routes:[
      {
          path:'/a',
          <!-- redirect:'b' -->
          <!-- redirect:{name:'foo'} -->命名的路由
          redirect: to=> { 也可以是对象，动态返回重定向目标
              // 方法接收 目标路由 作为参数
              // return 重定向的 字符串路径/路径对象
          }
      }
  ]

  7、别名
  “别名”的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。
  /a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。
   routes: [
       { path: '/a', component: A, alias: '/b' }
    ]

8、路由组件传参
  在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。
  * 取代与 $route 的耦合
    routes: [
    { path: '/user/:id', component: User }
    ]
  * 通过 props 解耦
    const User = {
    props: ['id'],
    template: '<div>User {{ id }}</div>'
    }
    const router = new VueRouter({
        routes: [
            { path: '/user/:id', component: User, props: true },

            // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
            {
            path: '/user/:id',
            components: { default: User, sidebar: Sidebar },
            props: { default: true, sidebar: false }
            }
        ]
    })
    布尔模式：如果 props 被设置为 true，route.params 将会被设置为组件属性。
    对象模式：{ path: '/home/news', component: News, props: { newsis: false } }
    函数模式：{ path: '/search', component: Search, props: (route) => ({ query: route.query.q }) }
    URL /search?q=vue 会将 {query: 'vue'} 作为属性传递给 SearchUser 组件。
    可能保持 props 函数为无状态的，因为它只会在路由发生变化时起作用。如果你需要状态来定义 props，请使用包装组件，这样 Vue 才可以对状态变化做出反应。

8、H5的HIstory模式
 默认hash模式，url改变页面不重载。 history 模式时，需要后台配置支持。
后台配置后，服务器不返回404，对于所有路径返回index，html，为避免这样，配置：
     { path: '*', component: NotFoundComponent }

9、导航守卫
  导航守卫主要通过跳转或取消的方式守卫导航。
  参数或查询的改变并不会触发进入/离开的导航守卫。你可以通过观察 $route 对象来应对这些变化，或使用 beforeRouteUpdate 的组件内守卫。

  全局前置守卫：
   router.beforeEach((to, from, next) => {
       //...
    })
    当一个导航触发时，全局前置守卫按创建顺序调用，守卫是异步解析执行，此时导航在所有守卫resolve完之前一直处于等待中
    to:目标路由对象
    from:要离开的
    next调用该方法来resolve这个钩子
    next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。

    next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。

    next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。

    next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
  
    router.beforeEach((to, from, next) => {
        if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
        else next()
    })

9、全局解析守卫
    你可以用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。

    #全局后置钩子
    这些钩子不会接受 next 函数也不会改变导航本身：
    router.afterEach((to, from) => {
    // ...
    })
10、路由独享的守卫
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})

11、组件内的守卫
    const Foo = {
        template: `...`,
        beforeRouteEnter (to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 只有这个守卫，不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
            //你可以通过传一个回调给next来访问组件实例，在导航被确认时候执行回调，把组件实例作为回调的参数
            next(vm => {
              //通过vm访问组件实例
            })
        },
        beforeRouteUpdate (to, from, next) {
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            this.name = to.params.name
            next()
        },
        beforeRouteLeave (to, from, next) {
            // 通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。
          const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
          if (answer) {
            next()
          } else {
            next(false)
          }
        }
    }

全局导航
    router.beforeEach((to,from,next)=>{}) router.resolve()
    router.afterEach((to,from)=>{})

路由独享
    beforeEnter:(to,from,next) =>{}

组件内
    beforeRouteLeave(to,from,next){}
    beforeRouteUpdate(to,from,next){}
    beforeRouteEnter(to,from,next){}


12、完整的导航解析流程：
  1.导航被触发
  2.在失活组件里调用beforeRouteLeave
  3.调用全局的beforeEach守卫
  4.在重用组件里调用beforeRouteUpdate守卫
  5.在路由配置里调用beforeEnter
  6.解析异步路由组件
  7.在被激活的组件里调用beforeRouterEnter
  8.调用全局的beforeResolve守卫
  9.导航被确认
  10.调用全局的afterEach钩子
  11.触发DOM更新
  12.用创建好的实例调用beforeRouteEnter守卫中传给next的回调函数

13、路由元信息
   routes 配置中的每个路由对象为 路由记录
   一个路由匹配到的所有路由记录会暴露为 $route 对象
    (还有在导航守卫中的路由对象)的 $route.matched 数组。
   因此，我们需要遍历 $route.matched 来检查路由记录中的 meta 字段。

   下面例子展示在全局导航守卫中检查元字段：
   router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!auth.loggedIn()) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      } else {
        next() // 确保一定要调用 next()
      }
   })

14、过渡效果
//给所有路由加
 <transition>
   <router-view></router-view>
 </transition>

 //给每个路由加不同过度效果
 const Foo = {
   template:`<translation name="foo"><div></div></translation>`
 }
 const Bar = {
   template:`<translation name="bar"><div></div></translation>`
 }

 基于当前路由和目标路由的变化关系动态设置过度
 <!-- 使用动态的 transition name -->
   <transition :name="transitionName">
      <router-view></router-view>
    </transition>
// 接着在父组件内
// watch $route 决定使用哪种过渡
watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}

15、数据获取
   导航完成后从服务端获取数据：在组件created里获取数据，在获取数据期间展示loading状态。
   created() {this.fetchData()}
   methods: {
     fetchData() {
       getPostAPI(this.$route.params.id,(err,post) => {})
     }
   }

   在导航完成前获取数据
   组件的 beforeRouteEnter 守卫中获取数据，当数据获取成功后只调用 next 方法。
   beforeRouteEnter (to, from, next) {
    getPostAPI(to.params.id, (err, post) => {
      next(vm => vm.setData(err, post))
    })
  },
    // 路由改变前，组件就已经渲染完了
    // 逻辑稍稍不同
    beforeRouteUpdate (to, from, next) {
      this.post = null
      getPost(to.params.id, (err, post) => {
        this.setData(err, post)
        next()
      })

滚动行为：
