///能发送ajax请求的函数模块，函数的返回值是promise对象，
import axios from 'axios'
export default function ajax(url,type='GET',data={}){
    if(type==='GET'){
        //拼请求参数的串
        let paramstr=''
        //比如data内容，{username：Eileen，password：1}，最后拼成 username=Eileen&password=1
        Object.keys(data).forEach(key =>{//keys属性名data[key]得到属性值
          
            paramstr+=key + '=' + data[key] + '&'  //得到username=username&password=1&.后面多了一个&
        })
        if(paramstr){//如果有值
            paramstr=paramstr.substring(0,paramstr.length-1)//去掉最后一个&
        }

        return axios.get(url+'?'+paramstr)//使用axios发送请求
    }else{
        return axios.post(url,data)
    }
}