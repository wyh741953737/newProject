import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
const Item=TabBar.Item
class Footer extends Component {
   static propTypes={
      navList:PropTypes.array.isRequired ,
      unReadCount:PropTypes.number.isRequired
   } 
  render() {
      let {navList,unReadCount } =this.props
      console.log(unReadCount,'ununReadCountunReadCountReadCount')
      //过滤掉hide为true的
      navList=navList.filter(nav => !nav.hide)
      //在非路由组件中使用路由库中api，withroute()
      const path=this.props.location.pathname
    return (    
        <TabBar >
            {
                navList.map((nav) => {
                  let navIcon = require(`./images/${nav.icon}-selected.png`);
                  let employeePng = require(`./images/${nav.icon}.png`);
                  console.log(navIcon);
                  return (
                    <Item key={nav.path}
                     title={nav.text}
                     badge={nav.path==='/message'? unReadCount :0}
                   //  icon={{url:require(`./images/${nav.icon}.png`)}}
                    // selectedIcon={{url:require(`./images/${nav.icon}-selected.png`)}}
                     selected={path===nav.path}
                     onPress={() => this.props.history.replace(nav.path)}
                     icon={<div style={{
                      width: '22px',
                      height: '22px',
                      // background: `url(require('./images/${nav.icon}.png') /  21px 21px no-repeat` }}
                      background: `url(${employeePng}) center / cover`}}
                    />}
                    selectedIcon={<div style={{
                      width: '22px',
                      height: '22px',
                      background: `url(${navIcon}) center / cover`}}
                    />
                    }
                  />    
              )
                })
             }
        </TabBar>
    )
  }
}
export default withRouter(Footer) 
//向外暴露with Router（）包装产生的组件，内部会向组件传入一些·路由组件特有的属性，history，location，math