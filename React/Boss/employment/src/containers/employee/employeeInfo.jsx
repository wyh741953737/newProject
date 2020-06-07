//求职者信息页面

import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  NavBar,
  InputItem,
  Button,
  List,
  Picker,
  TextareaItem,
  Modal,
} from 'antd-mobile'
import HeaderIcon from '../../components/headerSelector/headerSelector'
import { Redirect } from 'react-router-dom'
import { updateUser } from '../../redux/actions'

import CitySelector from '../../components/city/city'
const staes = [
  {
    label:
    (<div>
      <span>应届生</span>
    </div>),
    value: '毕业生',
  },
  {
    label:
    (<div>
    
      <span>离职-随时到岗</span>
    </div>),
    value: '随时到岗',
  },
  {
    label:
    (<div>
    
      <span>离职-月内到岗</span>
    </div>),
    value: '月内到岗',
  },
  {
    label:
    (<div>
    
      <span>在职-考虑机会</span>
    </div>),
    value: '考虑机会',
  }
];
const salarys = [
  {
    label:
    (<div>
      <span>3000-5000</span>
    </div>),
    value: '3k-5k',
  },
  {
    label:
    (<div>
    
      <span>5000-9000</span>
    </div>),
    value: '5k-9k',
  },
  {
    label:
    (<div>
      
      <span>9000-150000</span>
    </div>),
    value: '9k-15k',
  },
  {
    label:
    (<div>
      
      <span>15000-20000</span>
    </div>),
    value: '15k-20k',
  },
  {
    label:
    (<div>
      
      <span>21000-26000</span>
    </div>),
    value: '20k-25k',
  },
];
const experience=[
  {
    label:
    (<div>
      <span>无</span>
    </div>),
    value: '无工作经验',
  },
  {
    label:
    (<div>
    
      <span>1</span>
    </div>),
    value: '1年以内',
  },
  {
    label:
    (<div>
      
      <span>1-2</span>
    </div>),
    value: '1-2年',
  },
  {
    label:
    (<div>
      
      <span>2-3</span>
    </div>),
    value: '2-3年',
  },
  {
    label:
    (<div>
      
      <span>3以上</span>
    </div>),
    value: '3年以上',
  },
]
const degree=[
  {
    label:
    (<div>
      <span>博士生</span>
    </div>),
    value: '博士',
  },
  {
    label:
    (<div>
    
      <span>硕士生</span>
    </div>),
    value: '硕士',
  },
  {
    label:
    (<div>
      
      <span>研究生</span>
    </div>),
    value: '研究生',
  },
  {
    label:
    (<div> 
      <span>本科生</span>
    </div>),
    value: '本科',
  },
  {
    label:
    (<div>
      
      <span>专科生</span>
    </div>),
    value: '专科',
  }
]
const Item=List.Item
const Brief = Item.Brief;
const alert = Modal.alert;
class EmployeeInfo extends Component {
  state={
    header:'',
    post:'',
    info:'',
    stae:'',
    salarysValue:'',
    experiences:'',
    degrees:'',
    skills:'',
    city:[]
  }
  handleChange =(name,val) =>{
    this.setState({
      [name]:val
    })
  }
  clickHeader= (header) => {
    this.setState({ header })
  }
  clickCity= (city) => {
    console.log('jjj',city)
      this.setState({   city  })
  }
  save=()=>{
   console.log(this.state,'this.state')
    if(!this.state.header || !this.state.post || !this.state.info || !this.state.stae || !this.state.salarysValue || !this.state.experiences || !this.state.degrees) 
    {      alert('信息不完整', '请填写完整信息', [
            { text: '好的', onPress: () => console.log('ok') },
          ]) 
  }
    this.props.updateUser(this.state)
  }
 
  render() {
    const { header,type } = this.props.user
    const {post,info,stae,salarysValue, experiences, degrees}=this.state
    if(header &&  post && info && stae && salarysValue && experiences && degrees) {
      const path = type==='employee' ? '/employee' : '/boss'
      return <Redirect to={path}/>
    }
    return (
       
      <div>
       <NavBar>我的简历</NavBar>
       <HeaderIcon clickHeader={ this.clickHeader} />
       <InputItem placeholder='请输你想应聘的岗位' onChange={val => this.handleChange('post',val)}>求职岗位:</InputItem>
       <InputItem placeholder='请输入个人介绍'  onChange={val => this.handleChange('info',val)}>个人介绍:</InputItem>
       <TextareaItem title='我的技能:' placeholder='如React，Vue' rows={2} onChange={val => this.handleChange('skills',val)}/>
       <List >       
        <Item align="top"  multipleLine>
          期望工作的城市 
          <CitySelector clickCity={this.clickCity}/><Brief></Brief>
        </Item>
        <Picker
          data={staes}
          value={this.state.stae}
          cols={1}
          onChange={val => this.handleChange('stae',val)}
         
        >

          <List.Item arrow="horizontal">求职状态</List.Item>
        </Picker>
        <Picker
          data={degree}
          value={this.state.degrees}
          cols={1}
          onChange={val => this.handleChange('degrees',val)}
             >
          <List.Item arrow="horizontal">学历</List.Item>
        </Picker>
      <Picker
          data={salarys}
          value={this.state.salarysValue}
          cols={1}
          onChange={val => this.handleChange('salarysValue',val)}
        >
          <List.Item arrow="horizontal">期望工资</List.Item>
        </Picker>

        <Picker
          data={experience}
          value={this.state.experiences}
          cols={1}
          onChange={val => this.handleChange('experiences',val)}
        >
          <List.Item arrow="horizontal">工作经验</List.Item>
        </Picker>
      </List>
     
       <Button type='primary'  onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    )
  }
}
export default connect(
  state=>({user:state.user}),
  {updateUser}
)(EmployeeInfo)

