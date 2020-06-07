webpack五个核心概念
Entry
Output
Loader :webpack本身只能理解js，loader让webpack可以处理非js文件
Plugins 用于执行范围更广的任务
Mode 模式，production能让代码优化上线的环境
          development能让代码本地调试运行的环境
webpack-cli可以使用指令操作
 webpack ./src/index.js -o  ./build/built.js --mode=production
结论：
1，webpack只能识别js/json，不能处理css/img
2，生产环境比开发环境多一个压缩的js

引用多个loader使用use数组，一个就直接loader
use数组中的loader执行顺序从右边到左边，从下面到上面，依次执行
style-loader创建style标签，将js中的样式资源插入页面进行，添加到head中生效
css-loader将css文件变成commonjs模块加载到js中（用于在js中impore，require等方法引入css）
less-loader将less编译成css文件
postcss 将css加上浏览器Hack的loader

打包html----------------------------------------------------------------------------------------------------
    npm i html-webpack-plugin -D
    new HtmlWebpackPlugin({
        template:'./src/index.html'
    })
打包图片资源-------------------------------------------------------------------------------------------------
 url-loader依赖file-loader所以下载两个包
   npm i url-loader file-loader -D
   npm i html-loader -D
   url-loader这种方式处理不了html中的img图片，html中的img，需要使用html-loader来引入img，从而被url-loader处理
  问题：----------------------------------------------------------------------------------------------------
  * 打包后html中的img的src变成[object module] 默认情况下url-loader会使用es6模块化来处理模块，html-loader打包后引入的img是commonjs的引用，es6模块化解析不了
   解决：关闭url-loader的es6模块化，使用commonjs解析 esModule:false
打包其他资源
    使用exclude排除

devServer：---------------------------------------------------------------------------------------------------
    自动化（自动编译，自动打开浏览器，自动刷新浏览器）自动在内存中编译打包，不会有任何输出（中止运行又会把内存的东西删掉/）
    contentBase:resolve(__dirname,'build'),//项目构建后路径
    compress:true,//启动gizp压缩
    open:true //自动打开浏览器
    npm i webpack-dev-server
    执行npx webpack-dev-server不会有任何输出 webpack可以打包并且输出


babel-plugin-import
react-app-rewired

outputPath可以将其他资源输出到自定义文件夹

将css从js中提取出来--------------------------------------------------------------------------------------------
npm i mini-css-extract-plugin
打包上线的时候，css通过css-loader整合到了js中，这样的话js体积很大，解析速度会很慢，而且先加载js，之后动态的创建style标签会出现闪屏现象。解决：将css提取出来通过link加载

css兼容性处理------------------------------------------------------------------------------------------------
    npm i postcss-loader postcss-preset-env -D
    postcss postcss-loader，还有插件postcss-preset-env帮助postcss识别某些环境，和加载指定的配置，能让兼容性精确到某个版本
    //帮助postcss找到package.json中的1browserslist里面的配置，通过配置加载指定的css兼容样式
    在model里面配置好postcss之后还要在package.json里加一个配置
    "browserslist":{
        "development":[
            'last 1 chrome version' //表示兼容最近的chrome版本
            'last 1 firefox version' //表示兼容最近的firefox版本
            'last 1 safari version' //表示兼容最近的safari版本
        ],
        "production":[
            ">0.2%",//大于99.8%的浏览器
            "not dead"//不要已经死了的浏览器
            "not op_mini all"//op_mini早就死了，全都不要

        ]
    }
测试兼容性的时候，默认会以生产环境的配置为准，在测试的时候，设置nodejs环境变量就可以在开发时测试兼容性
process.env.NODE_ENV = 'development'

压缩css----------------------------------------------------------------------------------------------------
  npm i optimize-css-assets-webpack-plugin

js语法检查------------------------------------------------------------------------------------------------
    npm i eslint eslint-loader
    eslint eslint-loader,只检查自己的源代码，第三方库不会检查
            //设置检查规则：package.json中的eslintConfig中设置
            //npm i eslint-config-airbnb-base eslint-plugin-import eslint
        在package.json中
        "eslintConfig":{
            "extends":"airbnb-base",//配置继承airbnb-base
        }
    eslint-disable-next-line 下一行eslint所有规则都失效（下一行不进行检查）
    eslint不认识全局变量，window，navigator

js兼容性处理-----------------------------------------------------------------------------------------------
   1： npm i babel-loader babel-core @babel/preset-env -D 只能转换基本语法，不能转换promise等
   2：npm i @babel/polyfill 全部js兼容性处理 只需要在.js中import '@babel/polyfill' 
        不用配置，直接在文件中引入即可
    babel/ployfill原理：将浏览器的那些方法定义好，直接挂在对应的对象/方法上，不管识不识别都可以用。问题：只需要解决部分兼 容型问题，将所有兼容性代码全都引入，体积太大了
   3：需要做部分兼容性问题：按需加载 core.js 
       npm i core-js -D
       options:{
                 preset:[ 
                        '@babel/preset-env',
                        { 
                            useBuiltIns:'usage',
                            corejs:{
                                version:3
                            },
                            targets:{
                                chrome:'60',
                                firefox:'',
                                ie:'9',
                                safari:'10'
                            }
                        }
                    ]
       }
压缩html和js-----------------------------------------------------------------------------------------------
    生产环境下会自动压缩js代码，将mode改为production
    通过Html-webpack-plugin的minify
        minify:{
                collapseWhitespace:true, //移除空格
                removeComments:true //移除注释
        }
性能优化配置------------------------------------------------------------------------------------------------
*开发环境性能优化：
    优化打包构建速度
        HMR
    优化代码调试
        source-map
*生产环境性能优化
    优化打包速度
      *oneOf找到就用
      *缓存（babel缓存优化打包速度）
      *多进程打包
      *externals
      *dll（加上代码分割可以更细致的拆分（想拆几个就几个要拆就dll，不拆就optimization）。代码（node_modules（optimazion打包成一个）可以和自己的代码（通过import代码来任意拆分）
    优化代码运行性能
      *缓存（hash-chunkhash-contenthash）
        //hash-》webpack每次打包都会生成一个hash值，不管文件变不变，hash值一定变，这样整体内容都变。
        //chunkhash -》如果你打包来自同一个（chunk）入口，同一个入口共享一个hash值。css是由js引进的，一旦js变，css也得变，这样也不太好
        //contenthash根据文件内容生成hash值，不管你来不来自一个chunk，文件内容不同，hash值一定不一样。能保证第二次打包时候文件内容不变hash值也不变。contenthash能够更好的对一些文件做持久化缓存
      *tree shaking 
      *代码分割 
      *懒加载/预加载
      *pwa
      
      

优化:比如修改css文件，所有的文件都会被重新打包，耗时！=》模块热更新
    HMR------------------------------------------------------------------------------------------------------
    HMR是基于dev-server的，生产环境不需要dev-server
    HMR(hot module replacement 模块热替换) ==》一个模块发生改变，只会打包这一个模块，而不是所有的，极大提升构建速度
    1:样式文件：可以使用HMR功能，因为style-loader实现了HMR功能（这就是为什么开发环境使用style-loader，而生产环境必须提取为单独的文件。因为开发环境能够借助style-loader性能更好，打包速度更快。但是上线的时候考虑性能优化，就不能用它
    2:js文件：默认不能使用HMR。=>需要修改js代码，只能处理非入口js文件的其他文件。

        在index.js中
        if(module.hot) { //全局找module上hot属性，一旦有，说明开启了HMR功能，让HMR功能代码生效
            module.hot.accept('./print.js',function(){ 方法会监听print.js文件变化，一旦发生变化，其他默认不会重新打包构建，会执行回调函数

            })
        }
        如果还有其他模块就继续写上面的代码。
    3:html文件：默认不能使用HMR,同时会导致问题，html文件不能热更新了
        解决：修改entry入口，将html文件引入（还是不能实现热更新。html需不需要使用HMR？）
        html只有一个html文件一旦它发生变化就没有其他文件要变化。所以它变就全部都变（只有一个啊，不像js有很多），不能优化（不需要HMR
source-map:----------------------------------------------------------------------------------------------------
    一种提供源代码到构建后代码映射的技术（如果构建代码出错可以追踪到源代码）
     //[inline|hidden|eval][nosources][cheap-[module]]source-map
    //inline和eval是内联，开发模式。内联意味着source-map文件和js文件会放在一起。
    //其他都是外联，生产模式。外联的话会分割出来一个单独的map文件
    //inline-source-map内联 错误代码准确，源代码错误位置
    //hidden-source-map 外联 提供错误代码原因，但是没有错误位置
    //eval-source-map内联 每一个文件都生成对应的source-map，都在eval
    //nosources-source-map外联  错误代码准确，但是没有任何源代码信息
    //cheap-source-map 外联 错误代码准确信息和源代码的错误位置
    //内联和外联区别：外联生成了文件，内联没有，内联构建速度更快
    开发环境：速度快调试友好 
        速度快：>eval>inline>cheap
        调试友好：source-map>cheap-module-source-map>cheap-source-map
    生产环境：源代码不要隐藏，
        内联让代码体积变大，所以生产环境不要用内联
        source-map》cheap-sources-map 
oneof----------------------------------------------------------------------------------------------------
    以下loader只会匹配一个，使用oneof的话同一种文件不能有两个loader，有两个的话放到oneOf外面
缓存 -----------------------------------------------------------------------------------------------------
    因为js代码多，babel将js编译成浏览器可以识别的语法
    1：babel缓存，第二次构建时会读取之前的缓存。 cacheDirectory:true
    
    2:文件资源缓存
        使用缓存有一个问题，假设第一次构建完就将一些文件缓存了，你后面修改了源代码内容后，第二次构建时依然会读取之前的缓存，解决办法：添加hash值。
        修改文件名，每次webpack构建时会产生一个唯一的hash值，有一个小问题：我改变js文件，css不变之后打包，因为js和css共享hash值，导致所有缓存失效
        解决：chunkhash，根据chunk生成hash值，如果打包来源于同一个chunk，那么hash值一样。
            问题：js和css的hash值是一样的，因为css是在js中被引入的，属于同一个chunk
        contenthash根据文件的内容生产hash值，不同文件hash值一定不等
tree shaking------------------------------------------------------------------------------------------------
    (摇树，不死去的树叶摇下来) 把应用中不需要的代码shak下来（删除掉）去除不需要的代码，减少打包体积
    tree shaking前提：必须使用es6模块化，开启production环境
        使用es6模块化：使用import，export等es6语法
    问题：可能会把引入但没有使用的当作无用代码干掉
    解决：在package.json中配置sideEffects:false //所有代码都没有副作用（都可以进行tree shaking）
        sideEffects：["*.css","*.less"] //不会把css,less删掉
代码分割------------------------------------------------------------------------------------------------------
    1：多个入口 =》 问题：如果有很多入口，改来改去很麻烦
    2：多入口+optimization  =》  将node_modules中单独打包成一个chunk，(如果是单入口只会单独打包node_modules,多入口就会分析多入口chunk种有没有公共文件，将公共的打包成一个chunk。
        optimization:{
            splitChunks:{
                chunks:'all'
            }
        }
    3：单入口+optimization：可以单独打包node_module,如果你想单独打包一个文件成chunk，通过js代码，import动态导入语法
    在入口文件中加代码,就将test单独打包了。
        import('./test).then(result =>{}).catch()
    打包后名字不太好看，id汇编，不太友好，在文件名前面加webpackChunkName：'test'就不会变
        import(/*webpackChunkName:'test'*/'./test')

    如果应用是单页应用，加optimization会将node_modules也打包出去
    如果多页应用，多入口，会帮你分析公共依赖，打包成一个chunk
懒加载------------------------------------------------------------------------------------------------------
    延迟加载，等触发某些条件才加载，而不是一上来就加载
    import {mul} from './test'
    document.getElementById('btn').onclick = function(){
        console.log(mul(2,3))
    }
    使用懒加载之后
    document.getElementById('btn').onclick = function(){
        import('./test').then(()=>console.log(mul(2,3)))
    }
    将import放在一个异步的回调函数中。触发回调函数才被加载
    document.getElementById('btn').onclick = function(){
        import(/*webpackChunkName:'test',webpackPrefetch：true*/'./test').then(()=>console.log(mul(2,3)))
    }
    懒加载也得进行代码分割
    webpackPrefetch：true预加载
    预加载会在使用之前提前加载js文件
    懒加载当文件需要时才加载
    正常加载是并行加载，预加载：等其他资源加载完，空闲了再偷偷加载。懒加载要使用的时候才加载，当文件体积过大的时候，要等一段时间会给用户感觉点击延迟，第二次点击就不会了。预加载兼容性比较差，特别是在移动端
PWA --------------------------------------------------------------------------------------------
    pwa是由serviceWorker和catch构成。渐进式网络开发应用程序（让我们的网页像app一样在离线状态下也可以访问）
    workbox =》 workbox-webpack-plugin
    npm i workbox-webpack-plugin -D
    1,帮助serviceworker快速启动
    2，删除旧的serviceworker
    生成一个serviceworker配置文件
    注册serviceworker方法：在入口文件中
           首先要处理兼容问题
            if('serviceWorker' in navigator) {
               window.addEventListener('load',()=>{
                   navigator.serviceWorker.register('/service-worker.js')
                   .then(()=>{
                       console.log('注册成功')
                   }).catch()
               })
            }
    运行的时候会报eslint错误，因为eslint不认识全局变量比如window，navigator
    为了让eslint识别，改配置，在package.json中
        "eslintConfig":{
            "extends:"airbnb-base",
            "env":{
                "browser":true //支持浏览器端全局变量
                } 
        }
    serviceWorker必须应用在服务器上，要用服务器的方法启动构建后的build资源
    1：nodejs代码
        npm i serve -g //serve可以帮我们快速构建静态资源服务器
        serve -s build 启动服务器，将build目录下所有资源作为静态资源暴露出去 
    Application中找到server Workers看到注册的资源
    1：下载一个插件WorkboxWebpackPlugin.GenerateSW方法生产一个serveWorker配置文件，这个文件还生成了其他东西。
    2，在入口文件中写一段代码，就会去注册serviceWorkers，一旦注册成功，下次就会生效，网络断开后，就会从serviceWorker中加载上次通过serviceWorker缓存的结果
多进程打包--------------------------------------------------------------------------------------------
    npm i thread-loader -D
    一般给babel-loader用
    'thread-loader',//处理babel的时候开启多进程打包。将一个loader放在该loader后面就会开启多进程
    多进程打包有利有弊
    进程开启一帮要600ms，进程通信也有开销（只有工作时间消耗比较厂，才需要多进程打包,如果你本来只要1s打包好，你用了多进程，启动就得0.6秒，得不偿失
externals---------------------------------------------------------------------------------------------
    如果你希望通过CDN链接的方式引入一个包，那么你可以配置external来拒绝将这个包打包
    也就是忽略一个包不打包的时候你就得通过cdn手动引入
dll--------------------------------------------------------------------------------------------------
    dll动态链接库，类似externals一样指定哪些库（一般是第三方库，react，jquery）不需要打包
    node_modules默认打包成一个文件，但第三方库非常多，打包成一个文件，体积会很大，通过dll可以打包成不同的文件，有利于性能优化
    创建一个文件webpack.dll.js
    dll=>只要库不变，只要运行一次即可，将来源代码改变，只要反复运行webpack.config.js就可以，这样就不要重复打包第三方库
----和external区别：externals是彻底不打包通过cdn链接引进来，dll是打包一次，将来不用再打包
----如果你想通过cdn就用externals，如果你想把第三方库打包整合在一起，不是通过cdn而是自己服务器暴露出去就用dll

webpack详细配置-------------------------------------------------
    ***entry
        1，string，打包形成一个chunk，输出一个bundle文件，此时chunk默认名字main
        2，array，多入口，所有入口文件最终只会形成一个chunk，输出去只有一个bundle文件。只有在HMR功能中让html热更新生效
        3，object，多入口，有几个chunk就输出几个bundle文件
        特殊用法
            entry：{
                jquery:['jquery'],//打包成一个
                
                react:['react','react-router-dom']//多个打包成一个
            }
    ***output
        filename文件名称（指定名称+目录
        path：输出文件目录
        publicPath:'/'所有资源引入公共路径前缀
        chunkFilename:'js/[name]_chunk.js',//非入口chunk的名称，入口的叫入口chunk，比如import导入的
        library：'[name]'//整个库向外暴露的变量名
        libraryTarget:'global'//变量名添加到哪个node，
    ***module
    ***resolve解析模块规则
        1:alias解析模块别名（层级太多查找起来麻烦，配置路径别名可以简写路径，缺点是路径没有提示了）引入css的时候就import '$css/index.css'
        2:extentions配置省略文件路径的后缀名
        3:modules告诉webpack解析模块是去哪个目录找
        resolve:{
        alias:{
            $css:resolve(_dirname,'src/css')
        },
        extensions:['.js','.json','.css','.jsx'],
        modules:[resolve(__dirname,'../../node_modules'),'node_modules']
        },
    ***devServer
        
    ***optimization
        npm i terser-webpack-plugin -D
         假如index文件以import的方式引入了文件a，就会代码分割打包成两个单独的文件。如果文件a改变了，这个时候index文件不应该
         改变，但index文件保存了a文件的hash值，a改变hash值也改变，所以index文件也发生了改变。解决方法就是将hash值提取出来，main文件不保存hash值配置runtimeChunk
          runtimeChunk:{ //将当前模块记录的其他模块的hash值单独打包成一个文件runtime
                name:entrypoint =>`runtime-${entrypoint.name}`
          }

