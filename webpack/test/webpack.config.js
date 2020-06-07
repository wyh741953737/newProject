const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const webpack = require('webpack')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
//定义nodejs环境变量，决定使用browserlist的哪个环境
process.env.NODE_ENV = 'development'
const commonCssLoader = [
    MiniCssExtractPlugin.loader,//将MiniCssExtractPlugin取代style-loader,提取js中css成为单独文件
    'css-loader',
    //css兼容性处理，postcss postcss-loader，还有插件postcss-preset-env帮助postcss识别某些环境，和加载指定的配置，能让兼容性精确到某个版本
    {
        loader:'postcss-loader',
        options:{
            ident:'postcss',
            plugins:() => [
                //postcss插件
                require('postcss-preset-env')()//帮助postcss找到package.json中的1browserlist里面的配置，通过配置加载指定的css兼容样式
            ]
        }
    }
]
modules.exports = {
    // entry:'.src/index.js',
    // entry:['.src/index.js','index.html'],//解决html不能使用HMR
    entry:{ //多个入口文件 问题：如果有很多入口，改来改去很麻烦
        index:'./src/js/index.js',
        test:'./src/js/test.js'
    },
    output: {
            // filename:'built.js',
            filename:'js/[name].[contenthash:10].js',
            path:path.resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:eslint-loader,
                enforce:'pre', //优先处理
                options:{
                    fix:true //自动修复代码不规范的地方
                }
            },
            {
                oneOf:[ //一下loader只会匹配一个，使用oneof的话同一种文件不能有两个loader，有两个的话放到oneOf外面
                {
                    test:/\.css$/,
                    // use:[...commonCssLoader,'style-loader'],//开发环境
                    use:[...commonCssLoader]//生产环境
                },
                {
                    test:/\.less$/,
                    use:[...commonCssLoader,'less-loader']
                },
                //图片
                {
                    test:/\.(jpg|npg|gif)$/,
                    loader:'url-loader',
                    options:{
                        //图片小于8kb就会被base64处理
                        //优点：减少请求数量（减轻服务器压力）
                        //缺点：图片体积会更大（文件请求速度更慢）
                        limit:8 * 1024,
                        //给图片进行重命名，名字越长体积越大。[hash:10]取图片hash值的前十位[ext]取文件原来扩展名
                        name:'[hash:10].[txt]',
                        esModule:false,
                        outputPath:'medio' //将图片资源打包到outputPath
                    }
                },
                {
                    test:/\.html$/,
                    loader:'html-loader'
                },
                //打包其他资源
                {
                    exclude:/\.(css|js|html|less|jpg|npg|gif)$/,
                    loader:'file-loader'
                },
                //语法检查，eslint eslint-loader,只检查自己的源代码，第三方库不会检查
                //设置检查规则：package.json中的eslintConfig中设置
                //airbnb ->eslint-config-airbnb-base eslint-plugin-import
                //js兼容性处理，babel-loader
                {
                    test:/\.js$/,
                    exclude:/node_modules/,
                    use:[
                        {
                            loader:'thread-loader',//处理babel的时候开启多进程打包
                            options:{
                                worker:2//进程个数
                            }
                        },
                        {
                            loader:'babel-loader',
                            options:{
                                // preset:['@babel/preset-env']
                                preset:[ //预设：指示babel做怎样的兼容处理
                                    '@babel/preset-env',
                                    { 
                                        useBuiltIns:'usage',//按需加载
                                        corejs:{ version:3 },
                                        targets:{//指定兼容性做到哪个版本浏览器
                                            chrome:'60',
                                            firefox:'',
                                            ie:'9',
                                            safari:'10'
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
            }   ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            minify:{
                collapseWhitespace:true, //移除空格
                removeComments:true //移除注释
            }
        }),
        new MiniCssExtractPlugin({
            filename:'css/built.css' //对输出的css文件重命名，
            
        }),
        new OptimizeCssAssetsWebpackPlugin(),//css压缩
        new WorkboxWebpackPlugin.GenerateSW({
            /**
             * 1,帮助serviceworker快速启动
             * 2，删除旧的serviceworker
             * 生成一个serviceworker.js配置文件
             * 注册serviceworker方法：在入口文件中
             * 首先要处理兼容问题
             */
            clientsClaim:true,
            skipWaiting:true
        }),
        //告诉webpack哪些库不参与打包，同时使用时的名称也得变
        new webpack.DllReferencePlugin({
            minifest:resolve(__dirname,'dll/minifest.json')
        }),
        //将某个文件打包输出去，并且在html中自动引入该资源，比如jquery
        new AddAssetHtmlWebpackPlugin({
            filepath:resolve(__dirname,'dll/jquery.json')
        })
    ],
   
    //devServer自动化,自会在内存中编译打包，不会有任何输出
    devServer: {
        contentBase:resolve(__dirname,'build'),//项目构建后路径
        watchContentBase:true,//监视contentBase目录下所有文件，一旦文件变化就会reload
        watchOptions:{
            ignored:/node_modules/
        },
        proxy:{
            'api':{//一旦devServer（5000）接收到/api/xxx的请求就会把请求转发给另一个服务器（3000）
                target:'http://localhost:3000',
                pathRewrite:{//发送请求时，请求路径重写，将/api/xxx --》/xxx去掉/api
                    '^/api':''
                }
            }
        },
        compress:true,//启动gizp压缩
        hot:true,//开启HMR功能
        port:3000,
        open:true //自动打开浏览器
    },
    devtool:'source-map',//一种提供源代码到构建后代码映射的技术（如果构建代码出错可以追踪到源代码）
    //[inline|hidden|eval][nosources][cheap-[module]]source-map
    //inline和eval是内联，内联意味着source-map文件和js文件会放在一起。
    //其他都是外联，外联的话会分割出来一个单独的map文件
    //inline-source-map内联 错误代码准确，源代码错误位置
    //hidden-source-map 外联 提供错误代码原因，但是没有错误位置
    //eval-source-map内联 每一个文件都生成对应的source-map，都在eval
    //nosources-source-map外联  错误代码准确，但是没有任何源代码信息
    //cheap-source-map 外联 错误代码准确信息和源代码的错误位置
    //内联和外联区别：外联生成了文件，内联没有，内联构建速度更快

    optimization:{ //可以将node_modules单独打包成一个chunk输出，会自动分析多入口chunk中，有没有公共文件，如果有会打包成单独一个chunk
        splitChunks:{
            chunks:'all',
            //以下都是默认值，这也是为什么打包成一个，也不会重复打包原因
            // minSize:30 * 1024,
            // maxSize:0,
            // maxAsyncRequests:5,//按需加载时并行加载文件的最大值
            // maxInitialRequest:3,//入口js文件最大并行请求数量
            // automaticNameDelimiter:'~',//名称连接符
            // cacheGroups:{ 
            //     //分割chunk数组，node_modules文件会被打包到vendors组的chunk中---》vendors~xxx.js
            //     //满足上面的公共规则，如：大小超过30kb，至少被引用一次
            //     vendors:{
            //         test:/[\\/]node_modules[\\/]/,
            //         prioity:-10 //优先级
            //     },
            //     default:{
            //         minChunks:2,//要提取的chunk最少被引用2次
            //         prioity:-20,
            //         reuseExistingChunk:true //如果当前要打包的模块和之前的是同一个，就会复用，而不是重新打包模块
            //     }

            // }
        },
        /**
         * 假如index文件以import的方式引入了文件a，就会代码分割打包成两个单独的文件。如果文件a改变了，这个时候index文件不应该
         * 改变，但index文件保存了a文件的hash值，a改变hash值也改变，所以index文件也发生了改变。解决方法就是将hash值提取出来，main文件不保存hash值配置runtimeChunk
         */
        runtimeChunk:{ //将当前模块记录的其他模块的hash值单独打包成一个文件runtime
            name:entrypoint =>`runtime-${entrypoint.name}`
        },
        minizer:[
            //配置生产环境的压缩方案js和css。使用terser。
            new TerserWebpackPlugin({
                cache:true,//开启缓存
                parallel:true,//开启多进程打包
                sourceMap:true//启动source-map
            })
        ]
    },
    externals:{
        react:'react' //库名：npm下载的包名
    },
    resolve:{
        alias:{
            $css:resolve(_dirname,'src/css')
        },
        extensions:['.js','.json','.css','.jsx'],
        modules:[resolve(__dirname,'../../node_modules'),'node_modules']
    },
    mode:'development'
}
