var express = require('../node_modules/express');
var router = express.Router();
var cors = require('../node_modules/_cors@2.8.5@cors/lib')
var bodyParser = require('../node_modules/_body-parser@1.19.0@body-parser')
var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
app.post('/single2',(req,res) => {
  console.log(req.body)
})

module.exports = router;
