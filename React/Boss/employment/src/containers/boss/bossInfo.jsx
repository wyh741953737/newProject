//boss·信息页面
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

class BossInfo extends Component {
  state = {
    header:'',
    post:'',
    info:'',
    company:'',
    salary:''
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
        <NavBar>老板信息完善</NavBar>
        <HeaderIcon clickHeader={this.clickHeader}/>
        <InputItem placeholder="请输入职位" onChange={val => {this.handleChange('post',val)}}>招聘职位：</InputItem>
        <InputItem placeholder="请输入公司名称" onChange={val => {this.handleChange('company',val)}}>公司名称：</InputItem>
        <InputItem placeholder="请输入职位薪资" onChange={val => {this.handleChange('salary',val)}}>职位薪资：</InputItem>
        <TextareaItem title="职位要求：" rows={3} onChange={val => {this.handleChange('info',val)}}></TextareaItem>
        <Button type="primary" onClick={this.save}>保存</Button>
      </div>
    )
  }
}
export default connect(
  state => ({}),
  {updateUser}
)(BossInfo)
