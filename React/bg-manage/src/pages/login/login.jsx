import React, { Component } from 'react'
import { Form, Input,Checkbox, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api/index'
import logo from '../../assets/logo.jpg'
import './login.less'

/**登录界面 */

const Item=Form.item
class Login extends Component {
    constructor(props){
        super(props);
        this.input = React.createRef();
    }
    
    onFinish = values => {
        console.log('v',values)
        console.log(this.input.current)
        const {username,password} = values
        reqLogin(username,password).then(response => {
            console.log('成功',response.data)
        }).catch(error => {
            console.log('登录失败')
        })

    }
    // validatePwd = (rule,value,callback) => {
    //     if(!value) {
    //         callback('请输入用户名!')
    //     } else if(value.length<4) {
    //         callback('用户名至少4位')
    //     } else if(value.length>8) {
    //         callback('用户名最多8位')
    //     } else if(/^[a-zA-Z0-9_]+$/.test(value)) {
    //         callback('用户名必须是英文、字母或下划线组成')
    //     }
    //     callback()
    // }
    render() {
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>商品后台管理系统</h1>
                </header>
                <section className="login-wrap">
                    <h2>登录界面</h2>
                    <div>
                        <Form
                            name="normal_login"
                            className="login-form"
                            onFinish={this.onFinish}
                            ref={this.input}>
                            <Form.Item
                                name="username"
                                rules={[
                                    { required: true, message: '请输入用户名!' },
                                    {min:4,message:'用户名至少4位'},
                                    {max:8,message:'用户名最多8位'},
                                    {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、字母或下划线组成'},
                                ]}>
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                />
                            </Form.Item>                          
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </div>
        )
    }
}

export default Login
