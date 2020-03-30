/**
 * 连接数据库，获取连接对象，设置连接成功回调事件监听，定义schema模型，导出模型。
 */
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/boss')
const conn=mongoose.connection

conn.on('connected',()=>{
    console.log('数据库连接成功')
})
const userSchema=mongoose.Schema({
    username:{type:String,require:true},
    password:{type:String,require:true},
    type:{type:String,require:true},
    header:{type:String},
    post:{type:String},
    info:{type:String},
    company:{type:String},
    salary:{type:String},
    stae:{type:String},
    salarysValue:{type:String},
    experiences:{type:String},
    degrees:{type:String},
    city:{type:Array},
    skills:{type:String},
    scopes:{type:String},
    place:{type:String},
    job:{type:String},
    companyinfo:{type:String},
})
const UserModel=mongoose.model('user',userSchema)
exports.UserModel=UserModel //分别暴露

const chatSchema=mongoose.Schema({
    from:{type:String,required:true },//发送消息的用户的id
    to:{type:String,required:true },//接收用户的id
    content:{type:String,required:true },//内容
    chat_id:{type:String,required:true },//from和to组成的字符串
    create_time:{type:Number },//创建时间
    read:{type:Boolean,default:false },//是否已读
})
const ChatModel=mongoose.model('chat',chatSchema)
exports.ChatModel=ChatModel