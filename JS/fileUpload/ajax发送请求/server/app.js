var express = require('express')
var cors = require('cors')
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var formidable = require('formidable')
var multiparty = require('multiparty')

var app = express()
const upload_dir = path.resolve(__dirname, './public/uploads')
app.use(cors())

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/ajaxGet', (req, res) => {
  const user = req.query
  console.log(user)
  fs.readFile('./users.json', (err, users) => {
    let fsUsers = JSON.parse(users)
    console.log(fsUsers.users)
    const name = fsUsers.users.find((item) => {
      return item.name === user.name
    })
    console.log(name)
    if (name) {
      res.send({
        code: 1,
        msg: '用户名已存在'
      })
    } else {
      res.send({
        code: 0,
        name: user.name
      })
    }
  })
})

app.post('/ajaxPost', (req, res) => {
  const user = req.body
  console.log(user.name)
  fs.readFile('./users.json', (err, users) => {
    let fsUsers = JSON.parse(users)
    console.log(fsUsers.users)
    const name = fsUsers.users.find((item) => {
      return item.name === user.name
    })
    if (name) {
      res.send({
        code: 1,
        msg: '用户名已存在'
      })
    } else {
      res.send({
        code: 0,
        name: user.name
      })
    }
  })
})

app.get('/append', (req, res) => {
  var word = req.query
  console.log(word)
  res.send({
    word1: '比好啊' + new Date().getTime(),
    word2: 'hello',
    word3: '哈哈哈',
    word4: 'nice to see you',
    word5: '啊啊啊',
    word6: '去去去',
    word7: '哎哎哎',
  })
})

app.get('/formInspect', (req, res) => {
  var email = req.query
  console.log(email)
  res.send({
    code: 0,
    data: '恭喜你注册成功'
  })
})

app.post('/ajaxForm', (req, res) => {
  const form = new formidable.IncomingForm();
  //解析客户端传递过来的FormData对象
  form.parse(req, (err, fields, files) => {

    const username = fields.username

    console.log(username)

    fs.readFile('./users.json', (err, users) => {
      let fsUsers = JSON.parse(users)
      console.log(fsUsers.users)
      const name = fsUsers.users.find((item) => {
        return item.name === username
      })
      if (name) {
        res.send({
          code: 1,
          msg: '用户名已存在'
        })
      } else {
        res.send({
          code: 0,
          username
        })
      }
    })
  })


})

// 开放静态资源public
app.use(express.static('public'))
app.post('/upload', (req, res) => {
  console.log(req)
  var form = new formidable.IncomingForm()
  form.uploadDir = path.join(__dirname, './public/uploads')
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => { //fields：表示提交的表单数据对象,files：表示提交的文件对象
    var index = files.uploadfile.path.lastIndexOf('\\')
    var filename = files.uploadfile.path.substring(index + 1)
    res.send({
      path: `http://localhost:8080/uploads/${filename}`,
      name:'我的图片'
    })
  })
})
app.post('/single',(req,res) => {
  new multiparty.Form().parse(req,function(err,filelds,file) {
    if(err) {
      res.send({
        code:1,
        codeText:err
      })
      return
    }
    const [chunk] = file.chunk,
    [filename] = fields.filename,
    chunk_dir = `${upload_dir}/${filename}`

    let readStream = fs.createReadStream(chunk.path)
    let writeStream = fs.createWriteStream(chunk_dir)
    readStream.pipe(writeStream)
    readStream.on('end',function() {
      fs.unlinkSync(chunk.path)
    })
    res.send({
      code:0,
      codeText:'',
      path:`http://127.0.0.1:8080/uploads/${filename}`
    })
  })
})
app.post('/single2',(req,res) => {
  console.log(req.body)
  let {chunk,filename } = req.body
  let chunk_dir = `${upload_dir}/${filename}`
  console.log('chunk_dir',chunk_dir)
  chunk = decodeURIComponent(chunk).replace(/^data:image\/\w+;base64,/,"")
  console.log('chunk',chunk)
  chunk = Buffer.from(chunk,'base64')
  fs.writeFileSync(chunk_dir,chunk)
  res.send({
    code:0,
    codeText:'',
    path:`http://127.0.0.1:8080/uploads/${filename}`
  })
})
app.listen(8080, () => {
  console.log('server is running')
})