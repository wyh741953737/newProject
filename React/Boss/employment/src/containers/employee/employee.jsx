//大牛主界面路由容器
import React, { Component } from 'react'
import { connect} from 'react-redux'

 class Employee extends Component {

  render() {
   return (
     <div>Employee</div>
   )
  }
}
export default connect(
  
)(Employee)