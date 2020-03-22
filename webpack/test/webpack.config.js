const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
process.env.NODE_ENV = 'development'
modules.exports = {
    entry:'.src/index.js',
    output: {
            filename:'built.js',
            path:path.resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                // use:['style-loader','css-loader']
                use:[
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
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            //图片
            {
                test:/\(jpg|npg|gif)$/,
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
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'css/built.css' //对输出的css文件重命名
        }),
        new OptimizeCssAssetsWebpackPlugin()//css压缩
    ],
    mode:'development',
    //devServer自动化,自会在内存中编译打包，不会有任何输出
    devServer: {
        contentBase:resolve(__dirname,'build'),//项目构建后路径
        compress:true,//启动gizp压缩
        port:3000,
        open:true //自动打开浏览器
    }
}
