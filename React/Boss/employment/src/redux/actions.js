//登陆和注册两个请求，两个action
import io from 'socket.io-client'
import { 
    reqRegister,
    reqLogin ,
    requpdateUser,
    reqUser,
    reqUserList,
    reqChatMsgList,
    reqReadMsg,
    uploadLicense
} from '../api'
import {
    AUTH_SUCCESS,
     ERROR_MSG,
     RECEIVE_USER,
     RESET_USER,
     RECEIVE_USER_LIST,
     RECEIVE_MSG_LIST,
     RECEIVE_MSG,
     MSG_READ,
     CHANGE_LICENSE
    } from './action-types'

/*单例对象，
*1：创建对象前 判断对象是否存在，不存在才创建
 * 2创建对象后，保存对象
 */
function initIO(dispatch,userid){
    if(!io.socket){
        io.socket=io('ws://localhost:3001')
        io.socket.on('receiveMsg',function(chatMsg){
            //只有chatMsg和当前用户相关才dispatch分发同步action保存消息
            if(userid===chatMsg.from || userid===chatMsg.to)
            dispatch(receiveMsg(chatMsg,userid))
        console.log('客户端接受服务器发的消息',chatMsg)
    })
}
}
//异步发送消息
export const sendMsg=({ from,to,content}) => {
    return dispatch =>{
        console.log('客户端向服务器发送消息',{from,to,content})
        //发消息
        io.socket.emit('sendMsg',{from,to,content})
    }
}
//接收信息列表
export const receiveMsgList=({users,chatMsgs,userid}) =>({type:RECEIVE_MSG_LIST,data:{users,chatMsgs,userid}})
//接受一个消息的同步action
const receiveMsg =(chatMsg,userid) => ({type:RECEIVE_MSG,data:{chatMsg,userid}})

//异步获取消息列表数据
async function  getMsgList(dispatch,userid){
    initIO(dispatch,userid)
const response=await reqChatMsgList()
const result=response.data//这个result只有对方发给我的信息，没有我发给对方的
console.log('异步获取消息列表数据',result)
if(result.code===0){
    const {users,chatMsgs}=result.data
    dispatch(receiveMsgList({users,chatMsgs,userid}))
}
}
const authSuccess= (user) => ({ type:AUTH_SUCCESS,data:user})
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg})

const receiveUser = (user) => ({type: RECEIVE_USER,data:user})
export const resetUser = (msg) => ({type:RESET_USER,data:msg})
export const receiveUserList =(userList) =>({ type:RECEIVE_USER_LIST,data:userList })
export const changeLiscence = (data) => ({type:CHANGE_LICENSE,data:data})
export const register=( user ) =>{
    const {username, password,password2,type}=user
    if(!username){
        return errorMsg('用户名不能为空')
    }
   else if(password!==password2){
        return errorMsg('密码不一致')
    }
    return async dispatch => {
        //发送注册的异步请求
       //user是注册接口传过来的参数。
        //函数执行返回到结果是promise对象,用then取数据，传回调函数太麻烦， 
    const response= await reqRegister({username,password,type})
    const result=response.data  //这里的data包含了codedata，msg，就是后台传过来的数据
        if(result.code===0){//如果成功了，分发成功action
            getMsgList(dispatch,result.data._id)
            dispatch(authSuccess(result.data))//传result.data
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}
export const login=(user) =>{
const {password,username}=user
    if(!username){
        return errorMsg('用户名不能为空')
    }
   else if(!password){
        return errorMsg('密码不能为空')
    }
    return async dispatch => {
  
    const response= await reqLogin(user)
    const result=response.data 
        if(result.code===0){
            getMsgList(dispatch,result.data._id)
            dispatch(authSuccess(result.data))//传result.data
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}

export const updateUser=(user) => {
    return async dispatch => {
        const response = await requpdateUser(user)
        const result = response.data
        if(result.code===0){
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

export const getUser = () => {
    return async dispatch => {
        const response=await reqUser()
        const result=response.data
        if(result.code===0){
            getMsgList(dispatch,result.data._id)
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}
//异步获取用户列表的action
export const getUserList=(type)=>{
    return async dispatch => {
        //执行异步ajax请求
    const response=await reqUserList(type)
    const result=response.data
    if(result.code===0){
        dispatch(receiveUserList(result.data))
    }
}
}
export const readMsg=(from,to) =>{
    return async dispatch =>{
        const response=await reqReadMsg(from)
        const result=response.data
        if(result.code === 0){
            const count=result.data
            console.log('count',count)
            dispatch(msgRead({count,from,to}))
        }
    }
}
export const saveLicense = (base64) => {
    return async dispatch => {
        const response = await uploadLicense(base64)
        const result = response.data
        console.log('我是result',result)
        // if(result.code === 0) {
        //     dispatch(changeLiscence(result.data))
        // }
    }
}
const msgRead =({count,from,to}) => ({ type:MSG_READ,data:{count,from,to}})