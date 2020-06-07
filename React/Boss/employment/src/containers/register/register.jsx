import React, { Component } from 'react'
// import ReactDOM from 'react-dom';
import './register.css'
import '../../assets/css/index.css'
import Logo from '../../components/logo/logo'
import 'antd-mobile/dist/antd-mobile.css';
import {connect } from 'react-redux'
import {register } from '../../redux/actions'
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

// import LoginForm from '../../components/loginForm/loginform'
const ListItem=List.Item

//我们组件要和redux交互了，靠Register不行，本质上是UI组件，我们得像它里面传一个函数，将UI自建包装生成一个容器组件，引入connect，引入异步action
class Register extends Component {
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
   toLogin=()=>{
    this.props.history.replace('/login')
   }
   register = () => {
      this.props.register(this.state)
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
           <InputItem  placeholder='请输入用户名' onChange={ val => { this.handleChange('username',val)}}>用户名：</InputItem>
           <WhiteSpace/>
           <InputItem placeholder='请输入密码' type='password' onChange={ val => { this.handleChange('password',val)}}>密&nbsp;&nbsp;&nbsp;&nbsp;码：</InputItem>
           <WhiteSpace/>
           <InputItem placeholder='请确认密码' type='password' onChange={ val => { this.handleChange('password2',val)}}>确认密码：</InputItem>
           <WhiteSpace/>
           <ListItem>
             <span>用户类型：</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <Radio checked={type==='employee'} onChange={ val => { this.handleChange('type','employee')}}>&nbsp;&nbsp;牛人</Radio>&nbsp;&nbsp;
             <Radio  checked={type==='boss'} onChange={ val => { this.handleChange('type','boss')}}>&nbsp;&nbsp;BOSS</Radio>&nbsp;&nbsp;
             </ListItem>
             <WhiteSpace/>
             <Button type='primary' style={{backgroundColor:'#2cb6b6e3'}} onClick={this.register}>注册</Button>
             <WhiteSpace/>
             <Button  onClick={this.toLogin}>已有账户</Button>
         </List>
       </WingBlank>
      </div>
    )
  }
}

export default  connect(
  state => ({user:state.user}),//括号里是要传的数据。将store中的state和这里的props相互映射
  {register}
)(Register)
// 这个函数的第一个参数就是 Redux 的 store，mapStateToProps我们从中摘取了 count 属性。你不必将 state 中的数据原封不动地传入组件，可以根据 state 中的数据，动态地输出组件需要的（最小）属性。
// （2）函数的第二个参数 ownProps，是组件自己的 props
// 当 state 变化，或者 ownProps 变化的时候，mapStateToProps 都会被调用，计算出一个新的 stateProps，（在与 ownProps merge 后）更新给组件。
