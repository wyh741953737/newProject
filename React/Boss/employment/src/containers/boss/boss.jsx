//老板主界面路由容器
import React, { Component } from 'react'
import { connect} from 'react-redux'

 class Boss extends Component {
  render() {
    return (
      <div>Boss</div>
    )
  }
}
export default connect(

)(Boss)