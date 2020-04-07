var CONFIG = require('../config')
var bodyPaser = require('body-parser')
var multiparty = require('multiparty') //
var fs = require('fs')
var path = require('path')
var express = require('express');
var router = express.Router();
var app = express()

app.listen(CONFIG.PORT,() => {
  console.log('启动成功')
})
app.use((req,res,next) => {
  const {
    ALLOW_ORIGIN,
    CREDENTALS,
    HEADERS,
    ALLOW_METHODS
  } = CONFIG.CORS
  res.header("Access-Control-Allow-Origin",ALLOW_ORIGIN)
  res.header("Access-Control-Allow-Credentials",CREDENTALS)
  res.header("Access-Control-Allow-Headers",HEADERS)
  res.header("Access-Control-Allow-Methods",ALLOW_METHODS)
  req.method === 'OPTIONS' ? res.end('CURRENT SERVICES SUPPORTCROSS') : res.end('CURRENT SERVICES DO NOT SUPPORTCROSS')
})
app.use(bodyPaser.urlencoded({
  extended:false,
  limit:'1024mb'
}))
const upload_dir = path.resolve(__dirname,"","upload")
app.post('/single',(req,res) => {
  new multiparty.Form().parse(req,function(err,fields,file) {
    if(err) {
        res.send({
          code:1,
          codeText:err
        })
        return
    }
    const [chunk] = file.chunk
    const [filename] = fields.filename
    const chunk_dir = `${upload_dir}/${filename}`
    let readStream = fs.createReadStream(chunk.path)
    let writeStream = fs.createWriteStream(chunk_dir)
    readStream.pipe(writeStream)
    readStream.on('end',function() {
      fs.unlinkSync(chunk.path)
    })
    res.send({
      code:0,
      codeText:'',
      path:`http://127.0.0.1:${CONFIG.PORT}/upload/${filename}`
    })
  })
})

module.exports = router;
