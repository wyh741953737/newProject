//大牛主界面路由容器
import React, { Component } from 'react'
import { connect} from 'react-redux'
import UserList from '../../components/user-list/user-list'
import {getUserList } from '../../redux/actions'
 class Employee extends Component {
   componentDidMount(){
     //获取userlist
     this.props.getUserList('boss')
   }
  render() {
    return (
     <UserList userList={this.props.userList} />
    )
  }
}
export default connect(
  state => ({userList:state.userList}),
  {getUserList}
)(Employee)