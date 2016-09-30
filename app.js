// 应用入口文件
var express = require('express'),
	app = express(),
	path = require('path'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	session = require('express-session');

global.dbHelper = require('./common/dbHelper');
global.db = mongoose.connect('mongodb://127.0.0.1:27017/shop');

app.use(session({
	secret:'secret',
	cookie:{
		maxAge:1000*60*60
	}
}))

app.set('view engine','jade');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(multer());


app.use(function(req,res,next){
	res.locals.user = req.session.user;
	var err = req.session.error;
	res.locals.message = '';
	console.log(err)
	if(err)
		res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
	next();
})

require('./routes')(app);

app.get('/',function(req,res){
	res.render('login');
})



app.listen(3000);