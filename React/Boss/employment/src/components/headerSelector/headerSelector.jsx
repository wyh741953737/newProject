//选择用户头像界面
import React, { Component } from 'react'
import {
    Grid,
    List
} from 'antd-mobile'
import PropTypes from 'prop-types'
export default class HeaderIcon extends Component {
    static propTypes={
        clickHeader:PropTypes.func.isRequired
      }
    state={
        icon:null
    }

    constructor(props){
        super(props)
        this.headerList=[]
        for(let i=0;i<20;i++){
            this.headerList.push({
                text:'header'+(i+1),
                icon: require(`../../assets/images/header${i+1}.png`)
            })
        }
    }
    
handleClick =({ text,icon }) =>{
this.setState({icon})
this.props.clickHeader(text)
console.log(text)//打印header1，用户选择的头像文字信息
    }
  render() {
      const { icon } =this.state
      const ListHeader=!icon?'请选择头像':(<div>已选头像:<img src={icon} alt='header'></img></div>)
    return (
      <div>
        <List renderHeader={ () => ListHeader}>
            <Grid data={this.headerList} columnNum={5} onClick={this.handleClick}></Grid>
        </List>
      </div>
    )
  }
}
//这是子组件，子组件要传递数据给父组件，通过父组件的回调函数，