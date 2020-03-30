import React, { Component } from 'react'
import { Button } from 'antd-mobile'
 class NotFount extends Component {
  render() {
    return (
      <div>
        <div>
            <h2>抱歉，找不到该界面</h2>
            <Button type='primary' onClick={()=> this.props.history.replace('/')}>回到首页面</Button>
        </div>
      </div>
    )
  }
}
export default NotFount