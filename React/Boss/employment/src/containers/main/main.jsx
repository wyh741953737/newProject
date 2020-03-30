import React, { Component } from 'react'
import { Switch,Route,Redirect} from 'react-router-dom'
import EmployeeInfo from '../employee/employeeInfo'
import BossInfo from '../boss/bossInfo'
import Boss from '../boss/boss'
import Employee from '../employee/employee'
import Message from '../messagge/message'
import Personal from '../personal/personal'
import NotFount from '../../components/not-fount/not-fount'
import {
  NavBar,
   Icon,
  } from 'antd-mobile'
import { connect } from 'react-redux'
import { getRedirect } from '../../utils'
import Cookies from 'js-cookie'
// import Footer from '../../components/footer/footer'
import { getUser } from '../../redux/actions'
// import ChatDetail from '../chatDetail/chatDetail'
// import InfoDetail from '../infoDetail/infoDetail'

// import EmployeeDetail from '../employeeDetail/employeeDetail' 
// import MapInfo from '../../components/mapinfo/mapinfo'
// import Wei from '../../containers/personal-route/wei/wei'

import '../../assets/css/index.less'
 class Main extends Component {
   //给组件对象添加属性，包含所有导航组件相关信息
   navList=[
     {
       path:'/boss',
       component:Boss,
       title:'牛人列表',
       icon:'employee',
       text:'牛人',
       type:'search'
     },
     {
      path:'/employee',
      component:Employee,
      title:'BOSS列表',
      icon:'employee',
      text:'BOSS',
    },
    {
      path:'/message',
      component:Message,
      icon:'message',
      text:'消息',
      type:'',
      image:'./msg.png'
    },
    {
      path:'/personal',
      component:Personal,
      title:'个人中心',
      icon:'personal',
      text:'个人',
      type:'search'
    },
    
   ]
componentDidMount(){
     const userid=Cookies.get('userid')
     const { _id} =this.props.user
     if(userid && !_id){
       //发送异步请求，获取user
      this.props.getUser()
     }
   }
   /*
1)登陆过，关了浏览器，再次打开，cookies中有userid，但是还没有登陆（redux中的user没有_id）。发请求，获取userComponentDidMount
2)如果cookie没有userid，自动进入login界面
3)判断redux中user有没有_id,如果没有，暂时不显示信息。
4)如果有，说明已经登陆，显示对应界面
5)如果请求根路径，根据type，header显示对应界面
*/
  render() {
    const userid=Cookies.get('userid')
    if(!userid){//如果cookie没有userid 重定向登陆界面
      return <Redirect to='/login'/>
    }
    const { user } =this.props
    // console.log('我是未读信息',unReadCount)//打印当前未读数量
    //debugger
    if(!user._id){//如果cookie中有userid，读取redux中user，如果user中没有_id,暂时返回null
      return null
    }else{//如果有user_id，显示对应界面，如果请求根路径，根据user中的type，header重定向
      let path=this.props.location.pathname
      if(path==='/'){
         path=getRedirect(user.type,user.header)
          return <Redirect to={path}/>
        }
    }

      const { navList} =this
      const path=this.props.location.pathname
      const currentNav=navList.find(nav => nav.path===path)
      if(currentNav){
        if(user.type==='boss'){
          navList[1].hide=true
        }else{
          navList[0].hide=true
        }
      }
    return (
      <div>
         {currentNav ?
         <NavBar className='sticky-header' style={{ height: '1.5rem',backgroundColor:'#34d4cc'}} leftContent={[
             <Icon key="0" type={currentNav.type} style={{ marginRight: '16px' }} />
      ]}
      rightContent={[
        <Icon key="1" type="ellipsis" />,
      ]}
    >{currentNav.title?currentNav.title:null}</NavBar>:null}
      <Switch>
        {
          navList.map((nav,index) => <Route key={index} path={nav.path} component={nav.component} />)
        }
        <Route path='/employeeInfo' component={EmployeeInfo}/>
        <Route path='/bossInfo' component={BossInfo}/>
        {/* <Route path='/chatDetail/:userid' component={ChatDetail}/>
        <Route path='/infoDetail/:userid' component={InfoDetail}/>
        <Route path='/employeeDetail/:userid' component={EmployeeDetail}/> */}
        {/* <Route path='/mapinfo' component={MapInfo}/> */}
        {/* <Route path='/wei' component={Wei}/> */}
        <Route component={NotFount}/>
      </Switch>
      {/* {currentNav ? <Footer navList={navList} unReadCount={unReadCount}/>:null} */}
      </div>
    )
  }
}
export default connect(
  state => ({ user:state.user}),
  {getUser}
)(Main)
