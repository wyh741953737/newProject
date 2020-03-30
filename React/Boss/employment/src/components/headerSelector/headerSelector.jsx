//选择用户头像界面
import React, {Component} from 'react'
import {Grid,List} from 'antd-mobile'
import PropTypes from 'prop-types'
export default class HeaderIcon extends Component {

  static propTypes = {
    clickHeader:PropTypes.func.isRequired
  }
  state = {
    icon:null
  }
  constructor(props) {
    super(props)
    this.headerList = []
    for(let i=0;i<20;i++){
       this.headerList.push({
          text:'header'+(i+1),
          icon: require(`../../assets/images/header${i+1}.png`)
       })
    }
  } 
  handleClick = ({ text,icon }) => {
    this.setState({icon})
    this.props.clickHeader(text)
  }
  render() {
    const { icon } = this.state
    const ListHeader = !icon ? '请选择头像' : (<div>已选头像:<img src={icon} alt='header'></img></div>)
    return (
      <div>
        <List renderHeader={() => ListHeader}>
            <Grid data={this.headerList} columnNum={5} onClick={this.handleClick}></Grid>
        </List>
      </div>
    )
  }
}