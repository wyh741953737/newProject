multer多文件上传
app.post('/manyupload',multer({
    dest:'upload //文件存储路径，array多文件，single单文件
}).array('file',10),(req,res) => { //最大支持文件数量
    if(req.file.length === 0) {
        res.render('error),{message:'上传文件不能为空}
        return
    }
    const files = req.file
    const fileList = {}
    for(var i in files) {
        var file = files[i]
        fs.renameSync(file.path,`upload/${file.originalname}`)
        file.path = `upload/${file.originalname}`
        fileList.push(file)
    }
    res.send(fileList)
})
单文件
app.post('/upload',multer({
    dest:'upload //文件存储路径，array多文件，single单文件
}).silgle('file'),(req,res) => { //最大支持文件数量
    if(req.file.length === 0) {
        res.render('error),{message:'上传文件不能为空}
        return
    }
    const files = req.file
    const fileList = {}
    fs.renameSync(file.path,`upload/${file.originalname}`)
    file.path = `upload/${file.originalname}`
    fileList.push(file)
    res.send(fileList)
})


拖拽上传
    原事件和目标事件之间传递数据 e.dataTransfer