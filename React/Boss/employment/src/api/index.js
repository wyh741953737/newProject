import ajax from "./ajax";

//包含n个接口请求的函数模块,函数返回值为promise

//注册接口，
export const reqRegister = (user) => ajax('/register','POST', user)

//登陆接口
export const reqLogin = ({username,password}) => ajax('/login','POST', {username,password})

//更新用户接口

export const requpdateUser = (user) => ajax('/update','POST', user)

export const reqUser = (user) => ajax('/user')

export const reqUserList =(type) => ajax('/userlist','GET',{type})
//获取当前用户聊天消息列表
export const reqChatMsgList = () => ajax('/msglist','GET')

export const reqReadMsg= (from) => ajax('/readmsg','POST',{from})

//上传营业执照接口
export const uploadLicense = (file) => ajax('/uploadliscence','POST',file)