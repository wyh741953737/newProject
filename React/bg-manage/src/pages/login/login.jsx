import React, { Component } from 'react'
import { Form, Input,Checkbox, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.jpg'
import './login.less'

/**登录界面 */

const Item=Form.item
class Login extends Component {
    formRef = React.createRef()
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
                            ref={this.formRef}>
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
