//处理服务器返回的数据，code，data无论注册登录都是个user，meg。从后台返回到数据绝大部分都要存起来，好管理，在redux里管理。
//当前要管理的是user，写一个function，user
import { combineReducers } from 'redux'
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
import {getRedirect } from '../utils/index'
import { func } from 'prop-types'
import uploadImage from '../../src/containers/boss/image/upload2.jpg'
const initUser={
    username:'',
    type:'',
    msg:'',//后台返回的错误提示信息
    redirectTo:''
}
function user(state=initUser,action){
    //产生user状态的user
    switch(action.type){//分发了action，要去处理
        case AUTH_SUCCESS:
        const { type,header }=action.data
            return {
            ...action.data,//把原本的覆盖
            redirectTo:getRedirect(type,header)
            } 
        case ERROR_MSG:
            return {
                ...state,
                msg:action.data
            }
        case RECEIVE_USER://
            return action.data
        case  RESET_USER://重置用户信息
        return{//返回初始数据，并显示提示消息。
            ...initUser,
            msg:action.data
        }
        default :return state
    }
}
const initUserList=[]
function userList(state=initUserList,action){
    switch(action.type){
        case RECEIVE_USER_LIST:
        return action.data
        default:return state
    }
}
//产生聊天状态的reducer
const initChat={
    users:{},
    chatMsgs:[],//当前用户所有消息
    unReadCount:0//未读消息条数
}
function chat(state=initChat,action){
    //产生user状态的user
    switch(action.type){//分发了action，要去处理
            case RECEIVE_MSG_LIST:
            const { users,chatMsgs,userid}=action.data
            return {
            users,//把原本的覆盖
            chatMsgs,
            unReadCount:chatMsgs.reduce((Total,msg) => Total+(!msg.read && msg.to===userid ? 1:0),0)
            } 
            case RECEIVE_MSG:
            const {chatMsg}=action.data
            return{
                users:state.users,
                chatMsgs:[...state.chatMsgs,chatMsg],//接受新信息，将chatMsg加到chatMsgs中
        //三点运算符，拆解出原来数组的所有元素，再加一个新的，之前做法是用push，但是纯函数是不能改变的原来状态内容，只能产生新的，
                unReadCount:state.unReadCount+(!chatMsg.read && chatMsg.to=== action.data.userid?1:0)
            }
            case MSG_READ:
            const {count,from,to}=action.data
            //读信息，当前对话组未读信息数目为count，剩下的，tabbar要显示的unReadCount-count
            return{
                users:state.users,
                chatMsgs:state.chatMsgs.map(msg =>{
                    if(msg.from===from && msg.to===to && !msg.read){
                        return {...msg,read:true}
                        
                    }else{
                        return msg
                    }
                }),
                unReadCount:state.unReadCount-count
                
            }
        default :return state
    }
}
const initBackGImage = uploadImage
function changeLicense(state=initBackGImage,action) {
    switch(action.type) {
        case 'CHANGE_LICENSE':
            return action.data
        default: return state
    }
}
export default combineReducers({
   user,
   userList,
   chat,
   changeLicense
})
