import React, { Component } from 'react'
// import ReactDOM from 'react-dom';

import '../../assets/css/index.css'
import Logo from '../../components/logo/logo'
import 'antd-mobile/dist/antd-mobile.css';
import {connect } from 'react-redux'
import {login } from '../../redux/actions'
import {Redirect} from 'react-router-dom'
import { 
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,

  Button ,
} from 'antd-mobile'

const ListItem=List.Item


class Login extends Component {
   state={
     username:'',
     password:'',
     password2:'',
     type:'employee',
   }
   //处理输入数据的改变，更新对应的状态。
   handleChange=(name,val)=>{
   this.setState({
    [name]:val//[]表示变量，属性名默认是字符串
   })
   }
   toRegister=()=>{
    this.props.history.replace('/register')
   }
   login=()=>{
   
    this.props.login(this.state)
   }
  render() {
   const {type}=this.state
   const {msg,redirectTo}=this.props.user
   if(redirectTo){
   return <Redirect to={redirectTo}/>
}
    return (
      <div className='wrap'>
        <NavBar style={{backgroundColor:'#2cb6b6e3'}}>Boss&nbsp;直&nbsp;聘</NavBar>      
        <Logo/>
       <WingBlank>
         <List>
         <div className='error-msg'>{msg}</div>
           <InputItem  placeholder='请输入用户名' onChange={val=>{this.handleChange('username',val)}}>用户名：</InputItem>
           <WhiteSpace/>
           <InputItem placeholder='请输入密码' type='password' onChange={val=>{this.handleChange('password',val)}}>密&nbsp;&nbsp;&nbsp;&nbsp;码：</InputItem>
           <WhiteSpace/>
           <ListItem>
             <span>用户类型：</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <Radio checked={type==='employee'} onChange={val=>{this.handleChange('type','employee')}}>&nbsp;&nbsp;牛人</Radio>&nbsp;&nbsp;
             <Radio  checked={type==='boss'} onChange={val=>{this.handleChange('type','boss')}}>&nbsp;&nbsp;BOSS</Radio>&nbsp;&nbsp;
             </ListItem>
             <WhiteSpace/>
             <Button type='primary'style={{backgroundColor:'#2cb6b6e3'}} onClick={this.login}>登&nbsp;&nbsp;陆</Button>
             <WhiteSpace/>
             <Button  onClick={this.toRegister}>还没有账户</Button>
         </List>
       </WingBlank>
      </div>
    )
  }
}

export default  connect(
  state => ({user:state.user}),//括号里是要传的数据。
  {login}
)(Login)