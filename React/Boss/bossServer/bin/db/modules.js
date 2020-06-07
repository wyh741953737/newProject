/**
 * 连接数据库，获取连接对象，设置连接成功回调事件监听，定义schema模型，导出模型。
 */
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/boss',{useNewUrlParser: true,useUnifiedTopology: true}).catch((error)=>{console.log(error)})
const conn=mongoose.connection

conn.on('connected',()=>{
    console.log('数据库连接成功')
}).catch((error)=>{console.log(error)})
const userSchema=mongoose.Schema({
    username:{type:String,require:true},
    password:{type:String,require:true},
    type:{type:String,require:true},
    header:{type:String},
    post:{type:String},
    info:{type:String},
    company:{type:String},
    salary:{type:String},
    stae:{type:String},//
    salarysValue:{type:String},//薪资
    experiences:{type:String},//工作经验
    degrees:{type:String},//学历
    city:{type:Array},//城市
    skills:{type:String},//技能
    scopes:{type:String},
    place:{type:String},//地址
    job:{type:String},//职位
    companyinfo:{type:String},//公司信息


})
/**
 * boss要填写的：先注册账号1，招聘者username，密码。，然后填写基本信息
 * 1：公司全称companyName，1.1,公司简称companyAbbreviations,1.2,公司行业companyIndustry，1.3，2：上传公司执照companyCharter，发送ajax请求（这里只做简单处理，只要用户上传就通过，没上传拒绝进行下一步操作）
 *    通过之后填写（企业合法人legalPerson，注册时间registrationTime，注册资本registeredCapital，公司规模companySize，公司介绍companyIntroduction，公司照片companyPhoto），是否融资financing,在页面上设置下一步继续填写
 * 填写具体信息：2，招聘者头像recruiterHead，3，招聘人职位recruiterPosition，4，招聘岗位（array）jobs，5，岗位类型jobType，6，工作地点workingPlace，
 * 7，学历要求qualifications，8，是否校招/加急schoolExpress，9，工作时间workingTime（具体时间specificTime，双/单休weekend，是否弹性工作isElastic），经验experience，10，员工福利（array）welfare
 * 公司应聘岗位（array）【岗位名称jobName，岗位薪资范围salaryRange，职位详情jobDetails（技能要求，职位职责，职位要求，加分项，关键字）】
 * 
 * 
 * 牛人填写：
 * 注册：用户名，密码，类型，注册成功跳转到主界面，在个人信息里面完善个人信息
 * 头像，昵称(String)，头衔(String)，个人标签（Array），签名(String)，求职状态，求职期望
 * 上传附件简历
 */
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
