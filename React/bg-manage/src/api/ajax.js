/*能发送异步ajax请求的函数模块
封装axios库，函数返回值是promise对象
*/

import axios from 'axios'

export default function ajax(url,data={},type='Get') {
    if(type==='GET') {
        return axios.get(url,{
            params:data
        })
    } else {
        return axios.post(url,data)
    }
}