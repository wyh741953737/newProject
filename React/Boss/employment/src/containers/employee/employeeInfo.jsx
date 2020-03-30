//求职者信息页面
import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Redirect } from 'react-router-dom'
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button,
  List,
  Picker,
  Modal,
} from 'antd-mobile'
import HeaderIcon from '../../components/headerSelector/headerSelector'
import {updateUser} from '../../redux/actions'
const Item=List.Item
class EmployeeInfo extends Component {
  state = {
    header:'',
    
  }
  clickHeader = (header) => {
    this.setState({header})
  }
  handleChange = (name,value) => {
    this.setState({
      [name]:value
    })
  }
  save = () => {
    this.props.updateUser(this.state)
  }
  render() {
    const {header,type} = this.props.updateUser
    if(header) {
      const path = type === 'employee' ? '/employee' :'/boss'
      return <Redirect to={path}/>
    }
    return (
      <div>
        <NavBar>牛人信息完善</NavBar>
        <HeaderIcon clickHeader={this.clickHeader}/>
        <InputItem placeholder="请输入求职岗位" onChange={val => {this.handleChange('post',val)}}>求职岗位：</InputItem>
        <InputItem placeholder="请输入个人介绍" onChange={val => {this.handleChange('post',val)}}>个人介绍：</InputItem>
        <Button type="primary" onClick={this.save}>保存</Button>
      </div>
    )
  }
}
export default connect(
  state => ({user:state.user}),
  {updateUser}
)(EmployeeInfo)

