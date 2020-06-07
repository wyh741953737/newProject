// 当你运行webpack时，默认查找webpack.config.js配置文件
// 需求：需要运行webpack.dll.js文件 那么可以运行webpack --config webpack.dll.js。 
// 只要库不变，只要运行一次即可，将来源代码改变，只要反复运行webpack.config.js就可以，这样就不要重复打包第三方库
// 之后会生成两个文件比如jquery就会生成jquery.js和manifest.json.目的就是将来重新构建的时候不需要重复打包
const {resolve} = require('path')
const webpack = require('webpack')
module.exports ={
    entry:{
        //最终打包生成的[name]是jquery，数组里面是要打包的库
        jquery:['jquery']
    },
    output:{
        filename:'[name].js',
        path:resolve(__dirname,'dll'),
        library:'[name]_[hash]'//打包的库里面往外暴露出去的内容叫什么名字
    },
    plugins:[
        //打包生成一个mainfast.json文件 提供和jquery的映射关系
        new webpack.DllPlugin({
            name:'[name]_[hash]',//映射库的暴露的内容名称
            path:resolve(__dirname,'dll/mainfast.json')//输出文件路径
        })
    ]
}