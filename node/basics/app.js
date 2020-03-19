const http = require('http')
const mongoose = require('mongoose')
const url = require('url')
const app = http.createServer()

mongoose.connect('mongodb://localhost/student',{useNewUrlParser: true})
.then(() => console.log('数据库连接成功'))
.catch(() => console.log('数据库连接失败'))
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    age: {
        type: Number,
        min: 12,
        max: 50
    },
    password: String,
    email: String,
    hobbies: []
})
const User = mongoose.model('User',UserSchema)
app.on('request',async (req,res) =>{
    const method = url.method
    const {pathname} = url.parse(req.url)
    if(method == 'GET') {
        if(pathname == '/list') {
            let users = await User.find()
            console.log(users)
            let list = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://cdn.jsdeliver.net/npm/bootstrap@3.37/dist/css/bootstrap.min.css">
                <title>Document</title>
            </head>
            <body>
                <div class="container">
                    <h6>
                        <a href="add.html" class="btn btn-primary">添加用户</a>
                    </h6>
                    <table class="table table-striped table-bordered">
                        <tr>
                            <td>用户名</td>
                            <td>年龄</td>
                            <td>爱好</td>
                            <td>邮箱</td>
                            <td>操作</td>
                        </tr>
                    `
            users.forEach(item => {
                list+=`<tr>
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>`
                item.hobbies.forEach(item => {
                    list+=`<span>购物</span>
                    <span>看电视</span>
                    <span>旅行</span>`})
                list+=`</td>
                <td>${item.email}</td>
                <td>
                    <a href="" class="btn btn-danger btn-xs">删除</a>
                </td>
                <td>
                    <a href="" class="btn btn-success btn-xs">修改</a>
                </td>
            </tr>`
            })
                    list+=`</table>
                    </div>
                </body>
                </html>`
                }
        res.end(list)
    } else if(method == 'POST') {

    }
})
app.listen(3005)